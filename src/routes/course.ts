import { Router } from "express";
import courseController from "../controller/course-controller";

export const courseRouter = Router();

courseRouter.get("/", courseController.getAllCourses);
courseRouter.get("/:id", courseController.getSingleCourse);
courseRouter.post("/", courseController.createCourse);
courseRouter.put("/:id", courseController.updateCourse);
courseRouter.delete("/:id", courseController.deleteCourse);