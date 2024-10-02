import { Router } from "express";
import studentController from "../controller/student-controller";

export const studentRouter = Router();

studentRouter.get("/student-grade/:id", studentController.getStudentGrades)
studentRouter.get("/", studentController.getAllStudents);
studentRouter.get("/:id", studentController.getSingleStudent);
studentRouter.post("/", studentController.createStudent);
studentRouter.put("/:id", studentController.updateStudent);
studentRouter.delete("/:id", studentController.deleteStudent);
