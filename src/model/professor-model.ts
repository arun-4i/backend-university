import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config";
import { Department } from "./department-model";

export const Professor = sequelize.define(
  "Professor",
  {
    professor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: { type: DataTypes.STRING, allowNull: false },
    last_name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    department_id: {
      type: DataTypes.INTEGER,
      references: { model: Department, key: "department_id" },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    },
  },

  { timestamps: true }
);
