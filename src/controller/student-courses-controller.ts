import { Request, Response } from "express";
import { studentCourse } from "../model/junction/student-courses";

// Get all student-course records
const getAllStudentCourses = async (req: Request, res: Response) => {
  try {
    const studentCourses = await studentCourse.findAll();
    res.json(studentCourses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student-course record by IDs
const getSingleStudentCourse = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.params;
  try {
    const studentCourseRecord = await studentCourse.findOne({
      where: {
        student_id: studentId,
        course_id: courseId,
      },
    });
    if (studentCourseRecord) {
      res.json(studentCourseRecord);
    } else {
      res.status(404).json({ error: "Student-Course record not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new student-course record
const createStudentCourse = async (req: Request, res: Response) => {
  try {
    const { student_id, course_id } = req.body;
    const studentCourseRecord = await studentCourse.create({
      student_id,
      course_id,
    });
    res.status(201).json(studentCourseRecord);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a student-course record by IDs
const deleteStudentCourse = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.params;
  try {
    const studentCourseRecord = await studentCourse.findOne({
      where: {
        student_id: studentId,
        course_id: courseId,
      },
    });
    if (studentCourseRecord) {
      await studentCourseRecord.destroy();
      res.json({ message: "Student-Course record deleted successfully" });
    } else {
      res.status(404).json({ error: "Student-Course record not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Update a student-course record by IDs
const updateStudentCourse = async (req: Request, res: Response) => {
  const { studentId, courseId } = req.params;
  try {
    const studentCourseRecord = await studentCourse.findOne({
      where: {
        student_id: studentId,
        course_id: courseId,
      },
    });
    if (studentCourseRecord) {
      await studentCourseRecord.update(req.body);
      res.json({
        message: "Student-Course record updated successfully",
        updatedRecord: studentCourseRecord,
      });
    } else {
      res.status(404).json({ error: "Student-Course record not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  getAllStudentCourses,
  getSingleStudentCourse,
  createStudentCourse,
  deleteStudentCourse,
  updateStudentCourse,
};
