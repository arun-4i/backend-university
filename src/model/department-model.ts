import { DataTypes } from "sequelize";
import { sequelize } from "../config/db-config";

export const Department = sequelize.define(
  "Department",
  {
    department_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    department_name: { type: DataTypes.STRING, allowNull: false },
  },
  { timestamps: true }
);
