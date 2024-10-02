import { Router } from "express";
import professorController from "../controller/professor-controller";

export const professorRouter = Router();

professorRouter.get("/profcoursestudent/:id",professorController.getProfessorCourseStudent);
professorRouter.get("/", professorController.getAllProfessors);
professorRouter.get("/:id", professorController.getSingleProfessor);
professorRouter.post("/", professorController.createProfessor);
professorRouter.put("/:id", professorController.updateProfessor);
professorRouter.delete("/:id", professorController.deleteProfessor);

