import { Router } from "express";
import gradeController from "../controller/grade-controller";

export const gradeRouter = Router();

gradeRouter.get("/", gradeController.getAllGrades);
gradeRouter.get("/:id", gradeController.getSingleGrade);
gradeRouter.post("/", gradeController.createGrade);
gradeRouter.put("/:id", gradeController.updateGrade);
gradeRouter.delete("/:id", gradeController.deleteGrade);
