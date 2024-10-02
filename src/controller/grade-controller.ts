import { Request, Response, NextFunction } from "express";
import { Grade } from "../model/grade-model";
import { studentCourse } from "../model/junction/student-courses";

// Get all grades
const getAllGrades = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const grades = await Grade.findAll();
    res.json(grades);
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Get a single grade by ID
const getSingleGrade = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      res.json(grade);
    } else {
      res.status(404).json({ error: "Grade not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Create a new grade
const createGrade = async (req: Request, res: Response, next: NextFunction) => {
  const { student_id, course_id, grade } = req.body; // Destructure the request body

  try {
    if (
      Array.isArray(course_id) &&
      Array.isArray(grade) &&
      course_id.length === grade.length
    ) {
      const gradePromises = course_id.map((courseId, index) => {
        // Create grade for each course
        return Grade.create({
          student_id,
          course_id: courseId,
          grade: grade[index],
        }).then(() => {
          // Also insert into the studentCourse junction table for each course
          return studentCourse.create({
            student_id,
            course_id: courseId,
          });
        });
      });

      // Execute all the promises in parallel
      const insertedData = await Promise.all(gradePromises);

      res.json({
        message: "Grades and student-course entries created successfully!",
        insertedData,
      });
    } else {
      res
        .status(400)
        .json({
          error: "course_id and grade must be arrays of the same length",
        });
    }
  } catch (error: any) {
    console.error("Error creating grades:", error);
    res.status(500).json({ error: error.message });
  }
};


// Delete a grade by ID
const deleteGrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      await grade.destroy();
      res.json({ message: "Grade deleted successfully" });
    } else {
      res.status(404).json({ error: "Grade not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

// Update a grade by ID
const updateGrade = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const grade = await Grade.findByPk(req.params.id);
    if (grade) {
      const updatedGrade = await Grade.update(req.body, {
        where: { grade_id: req.params.id },
      });
      res.json({
        message: "Grade updated successfully",
        updatedGrade: updatedGrade,
      });
    } else {
      res.status(404).json({ error: "Grade not found" });
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};

export default {
  getAllGrades,
  getSingleGrade,
  createGrade,
  updateGrade,
  deleteGrade,
};
