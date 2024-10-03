import { Request, Response, NextFunction } from "express";
import { Course } from "../model/course-model";

// Get all courses
const getAllCourses = async (
  req: Request,
  res: Response,
) => {
  try {
    const courses = await Course.findAll();
    res.json(courses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single course by ID
const getSingleCourse = async (
  req: Request,
  res: Response,
) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      console.log("professor_id: ", course.dataValues.professor_id);
      res.json(course);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new course
const createCourse = async (
  req: Request,
  res: Response,
) => {
  try {
    const course = await Course.create(req.body);
    res.status(201).json(course);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a course by ID
const deleteCourse = async (
  req: Request,
  res: Response,
) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      await course.destroy();
      res.json({ message: "Course deleted successfully" });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a course by ID
const updateCourse = async (
  req: Request,
  res: Response,
) => {
  try {
    const course = await Course.findByPk(req.params.id);
    if (course) {
      const updatedCourse = await Course.update(req.body, {
        where: { course_id: req.params.id },
      });
      res.json({
        message: "Course updated successfully",
        updatedCourse: updatedCourse,
      });
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllCourses,
  getSingleCourse,
  createCourse,
  updateCourse,
  deleteCourse,
};
