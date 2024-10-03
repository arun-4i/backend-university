import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config";
import { Professor } from "./professor-model";

export const Course = sequelize.define(
  "Course",
  {
    course_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    course_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: false },
    professor_id: {
      type: DataTypes.INTEGER,
      references: { model: Professor, key: "professor_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    }
  },
  { timestamps: true }
);
