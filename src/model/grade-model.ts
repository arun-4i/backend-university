import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config";
import { Student } from "./student-model";
import { Course } from "./course-model";

export const Grade = sequelize.define(
  "Grade",
  {
    grade_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
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
    grade: {
      type: DataTypes.ENUM,
      values: ["S", "A", "B", "C", "D", "E", "F"], // Enum for allowed values
      allowNull: false,
      validate: {
        isIn: {
          args: [["S", "A", "B", "C", "D", "E", "F"]], // Validation to allow only specific values
          msg: "Grade must be one of S, A, B, C, D, E, F",
        },
      },
    },
  },
  { timestamps: true }
);
