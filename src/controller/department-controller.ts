import { Request, Response, NextFunction } from "express";
import { Department } from "../model/department-model";
import { Professor } from "../model/professor-model";
import { Course } from "../model/course-model";

// Get all departments
const getAllDepartments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("inside getAllDepartments");

  try {
    const departments = await Department.findAll();
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single department by ID
const getSingleDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("inside getSingleDepartment");

  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      res.json(department);
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new department
const createDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await Department.create(req.body);
    res.status(201).json(department);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a department by ID
const deleteDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      await department.destroy();
      res.json({ message: "Department deleted successfully" });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a department by ID
const updateDepartment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const department = await Department.findByPk(req.params.id);
    if (department) {
      const updatedDepartment = await Department.update(req.body, {
        where: { department_id: req.params.id },
      });
      res.json({
        message: "Department updated successfully",
        updatedDepartment: updatedDepartment,
      });
    } else {
      res.status(404).json({ error: "Department not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const getDepartmentProfessorCourses = async (req: Request, res: Response) => {
  console.log("inside getDepartmentProfessorCourses");
  try {
    // Fetch departments with associated professors and their courses
    const departments = await Department.findAll({
      attributes: ["department_id", "department_name"],
      include: [
        {
          model: Professor,
          attributes: ["professor_id", "first_name", "last_name"],
          include: [
            {
              model: Course,
              attributes: ["course_id", "course_name"],
            },
          ],
        },
      ],
    });
    res.json(departments);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


export default {
  getAllDepartments,
  getSingleDepartment,
  createDepartment,
  updateDepartment,
  deleteDepartment,
  getDepartmentProfessorCourses,
};
