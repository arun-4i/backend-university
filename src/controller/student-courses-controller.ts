import { Request, Response } from "express";
import { studentCourse } from "../model/junction/student-courses";
import { Student } from "../model/student-model";
import { Course } from "../model/course-model";

// Get all student-course records
const getAllStudentCourses = async (req: Request, res: Response) => {
  try {
    const studentCourses = await studentCourse.findAll({
      attributes: [],
      include: [
        {
          model: Student,
          attributes: ["first_name", "last_name"],
        },
        {
          model: Course,
          attributes: ["course_name"],
        },
      ],
    });
    res.json(studentCourses);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single student-course record by IDs
const getStudentCourse = async (req: Request, res: Response) => {
  const studentId = req.params.id;
  try {
    const studentCourseRecord = await studentCourse.findAndCountAll({
      where: {
        student_id: studentId,
      },
      attributes: [],
      include: [
        {
          model: Student,
          attributes: ["student_id","first_name", "last_name"],
        },
        {
          model: Course,
          attributes: ["course_id","course_name"],
        },
      ],
    });
    res.json(studentCourseRecord);
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
      res.status(200).json({ message: "Student's Specific Course record deleted successfully" });
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
  const { new_course_id } = req.body;

  try {
    const existingRecord = await studentCourse.findOne(
      {
        where: {
          student_id: studentId,
          course_id: new_course_id,
        },
      }
    );

    if (existingRecord) {
      res.status(400).json({
        error: "This student is already enrolled in the specified course.",
      });
    }
    else {
      const [updateCourse] = await studentCourse.update(
        { course_id: new_course_id },
        {
          where: {
            student_id: studentId,
            course_id: courseId,
          },
          // Disable Sequelize's optimization that skips updates for identical data
          silent: false,
        }
      );
      if (updateCourse > 0) {
        res.status(200).json({
          message: "Student's Specific Course record updated successfully",
          updatedRows: updateCourse,
        });
      }
      else {
        res.status(400).json({ error: "Student-Course record not found" });
      }
    }
  } catch (error: any) {
    res.status(404).json({ error: error.message });
  }
};


export default {
  getAllStudentCourses,
  getStudentCourse,
  createStudentCourse,
  deleteStudentCourse,
  updateStudentCourse,
};
