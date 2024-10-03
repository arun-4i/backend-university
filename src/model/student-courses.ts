import { DataTypes } from "sequelize";
import { Student } from "./student-model";
import { Course } from "./course-model";
import { sequelize } from "../config/db-config";


export const studentCourse = sequelize.define(
  "studentCourse",
  {
    student_id: {
      type: DataTypes.INTEGER,
      references: { model: Student, key: "student_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    course_id: {
      type: DataTypes.INTEGER,
      references: { model: Course, key: "course_id" },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
  },
  { timestamps: true }
);