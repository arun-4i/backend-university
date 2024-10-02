import { Router } from "express";
import studentCourseController from "../controller/student-courses-controller";

export const studentCourseRouter = Router();

studentCourseRouter.get("/", studentCourseController.getAllStudentCourses);
studentCourseRouter.get("/:id", studentCourseController.getSingleStudentCourse);
studentCourseRouter.post("/", studentCourseController.createStudentCourse);
studentCourseRouter.put("/:id", studentCourseController.updateStudentCourse);
studentCourseRouter.delete("/:id", studentCourseController.deleteStudentCourse);
