import { Request, Response, NextFunction } from "express";
import { Professor } from "../model/professor-model";
import { Course } from "../model/course-model";
import { Student } from "../model/student-model";

// Get all professors
const getAllProfessors = async (
  req: Request,
  res: Response,
) => {
  try {
    const professors = await Professor.findAll();
    res.json(professors);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single professor by ID
const getSingleProfessor = async (
  req: Request,
  res: Response,
) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      res.json(professor);
    } else {
      res.status(404).json({ error: "Professor not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new professor
const createProfessor = async (
  req: Request,
  res: Response,
) => {
  try {
    const professor = await Professor.create(req.body);
    res.json(professor);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Delete a professor by ID
const deleteProfessor = async (
  req: Request,
  res: Response,
) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      await professor.destroy();
      res.json({ message: "Professor deleted successfully" });
    } else {
      res.status(404).json({ error: "Professor not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Update a professor by ID
const updateProfessor = async (
  req: Request,
  res: Response,
) => {
  try {
    const professor = await Professor.findByPk(req.params.id);
    if (professor) {
      const updatedProfessor = await Professor.update(req.body, {
        where: { professor_id: req.params.id },
      });
      res.json({
        message: "Professor updated successfully",
        updatedProfessor: updatedProfessor,
      });
    } else {
      res.status(404).json({ error: "Professor not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

const getProfessorCourseStudent = async (req: Request, res: Response) => {
 const professorId  = req.params.id;
 try {
   const professor = await Professor.findOne({
     where: { professor_id: professorId },
     attributes: ["professor_id", "first_name", "last_name"],
     include: [
       {
         model: Course,
         attributes: ["course_id", "course_name"],
         include: [
           {
             model: Student,
             through: { attributes: [] },
             attributes: ["student_id", "first_name", "last_name"],
           },
         ],
       },
     ],
   });
   res.json(professor);
 } catch (error:any) {
  res.status(500).json({ error: error.message });
 }
};

export default {
  getAllProfessors,
  getSingleProfessor,
  createProfessor,
  updateProfessor,
  deleteProfessor,
  getProfessorCourseStudent,
};
