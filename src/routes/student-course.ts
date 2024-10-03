import { Router } from "express";
import studentCourseController from "../controller/student-courses-controller";

export const studentCourseRouter = Router();

studentCourseRouter.get("/", studentCourseController.getAllStudentCourses);
studentCourseRouter.get("/:id", studentCourseController.getStudentCourse);
studentCourseRouter.post("/", studentCourseController.createStudentCourse);
studentCourseRouter.put("/:studentId/:courseId",studentCourseController.updateStudentCourse);
studentCourseRouter.delete("/:studentId/:courseId",studentCourseController.deleteStudentCourse);
