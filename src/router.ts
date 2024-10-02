import { Router } from "express";
import { END_POINTS } from "./constants/end-points";
import { studentRouter } from "./routes/student";
import { professorRouter } from "./routes/professor";
import { gradeRouter } from "./routes/grade";
import { departmentRouter } from "./routes/deparment";
import { courseRouter } from "./routes/course";
import { studentCourseRouter } from "./routes/student-course";


export const router = Router();

router.use(END_POINTS.STUDENT, studentRouter);
router.use(END_POINTS.PROFESSOR, professorRouter);
router.use(END_POINTS.GRADE, gradeRouter);
router.use(END_POINTS.DEPARTMENT, departmentRouter);
router.use(END_POINTS.COURSE, courseRouter);
router.use(END_POINTS.STUDENT_COURSE, studentCourseRouter);
