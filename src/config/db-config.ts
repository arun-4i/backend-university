import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("uni_db", "root", "root", {
  dialect: "mysql",
});
