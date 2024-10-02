import { Request, Response } from "express";
import { Student } from "../model/student-model";
import { Course } from "../model/course-model";
import { Grade } from "../model/grade-model";
import { Department } from "../model/department-model";

// Get all students
const getAllStudents = async (
  req: Request,
  res: Response,
) => {
  try {
    const students = await Student.findAll();
    res.json(students);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single student by ID
const getSingleStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new student
const createStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    const student = await Student.create(req.body);
    res.json(student);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Delete a student by ID
const deleteStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      await student.destroy();
      res.json({ message: "Student deleted successfully" });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Update a student by ID
const updateStudent = async (
  req: Request,
  res: Response,
) => {
  try {
    const student = await Student.findByPk(req.params.id);
    if (student) {
      const updatedStudent = await Student.update(req.body, {
        where: { student_id: req.params.id },
      });
      res.json({
        message: "Student updated successfully",
        updatedStudent: updatedStudent,
      });
    } else {
      res.status(404).json({ error: "Student not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// 2) Get service to fetch a student's enrolled courses and grades.
const getStudentGrades = async (req: Request, res: Response) => {
  try {
    const studentId = req.params.id; 

    const student = await Student.findOne({
      where: { student_id: studentId },
      attributes: ["student_id", "first_name", "last_name"], 
      include: [
        {
          model: Department, 
          attributes: ["department_name"],
        },
        {
          model: Course, 
          attributes: ["course_id", "course_name"],
          through: {
            attributes: [], // Exclude attributes from the junction table
          },
          include: [
            {
              model: Grade, 
              attributes: ["grade"], // Fetch only the grade field
              where: { student_id: studentId }, // Ensure to filter grades by the student
              required: false, // This makes the join optional
            },
          ],
        },
      ],
    });
    res.json(student);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



export default {
  getAllStudents,
  getSingleStudent,
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentGrades,
};
