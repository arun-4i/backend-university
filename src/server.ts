import { sequelize } from "./config/db-config";
import { closeServer, initServer } from "./services/webServer";

import { logAssociations } from "./utils/checkAssociations";
import { Student } from "./model/student-model";
import { Course } from "./model/course-model";
import { Department } from "./model/department-model";
import { Professor } from "./model/professor-model";
import { Grade } from "./model/grade-model";
import defineAssociations from "./associations/associations";
import { studentCourse } from "./model/student-courses";

const startup = async () => {
  console.log(`Starting application`);
  try {
    console.log("Initializing web server module");
    await initServer();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

sequelize
  .authenticate()
  .then(() => {
    console.log(`${process.env.DB_DIALECT} DataBase Connection Extablish !!!!`);
  })
  .catch((error: any) => {
    console.log("Unable to connect to the database", error);
  });

sequelize
  .sync({
    logging: false,
  })
  .then(() => {
    const models = {
      Student,
      Course,
      Department,
      Professor,
      Grade,
      studentCourse
    };
    defineAssociations(models);
    // const temp = logAssociations(); 
    // console.log(temp); 
    console.log("DataBase Sync complete !!!\n");
  })
  .catch((error: any) => console.log("Unable to create table: ", error));

// Starting the function initially
startup();

const shutdown = async (e?: Error) => {
  let err = e;
  console.log("Shutting down application");
  try {
    console.log("Closing web server module");
    await closeServer();
  } catch (e: any) {
    console.error(e);
    err = err || e;
  }
  if (err) {
    process.exit(1); // Non-zero failure code
  } else {
    process.exit(0);
  }
};

process.on("SIGTERM", (signal) => {
  console.log(`Received ${signal}`);
  shutdown();
});

process.on("SIGINT", async (signal) => {
  console.log(`Received ${signal}`);
  shutdown();
});

process.on("uncaughtException", (err) => {
  console.error("uncaught exception");
  console.error(err);
  shutdown(err);
});
