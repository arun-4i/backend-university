import { Router } from "express";
import departmentController from "../controller/department-controller";

export const departmentRouter = Router();

departmentRouter.get("/deptprofcourse",departmentController.getDepartmentProfessorCourses);
departmentRouter.get("/", departmentController.getAllDepartments);
departmentRouter.get("/:id", departmentController.getSingleDepartment);
departmentRouter.post("/", departmentController.createDepartment);
departmentRouter.put("/:id", departmentController.updateDepartment);
departmentRouter.delete("/:id", departmentController.deleteDepartment);
