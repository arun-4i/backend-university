
// Function to define associations
const defineAssociations = (models:any) => {
  const { Student, Course, Department, Professor, Grade, studentCourse } =
    models;

  // DEPARTMENT ASSOCIATIONS
  Department.hasMany(Professor, { foreignKey: "department_id" });
  Professor.belongsTo(Department, { foreignKey: "department_id" });

  Department.hasMany(Course, { foreignKey: "department_id" });
  Course.belongsTo(Department, { foreignKey: "department_id" });

  Department.hasMany(Student, { foreignKey: "department_id" });
  Student.belongsTo(Department, { foreignKey: "department_id" });

  // STUDENT ASSOCIATIONS
  Student.belongsToMany(Course, {
    through: "studentCourse",
    foreignKey: "student_id",
  });
  Course.belongsToMany(Student, {
    through: "studentCourse",
    foreignKey: "course_id",
  });

  //JUNCTION TABLE ASSOCIATIONS
  studentCourse.belongsTo(Student, { foreignKey: "student_id" });
  studentCourse.belongsTo(Course, { foreignKey: "course_id" });

  Student.hasMany(Grade, { foreignKey: "student_id" });
  Grade.belongsTo(Student, { foreignKey: "student_id" });

  // PROFESSOR ASSOCIATIONS
  Professor.hasMany(Course, { foreignKey: "professor_id" });
  Course.belongsTo(Professor, { foreignKey: "professor_id" });

  Professor.belongsTo(Department, { foreignKey: "department_id" });
  Department.hasMany(Professor, { foreignKey: "department_id" });

  // GRADE ASSOCIATIONS
  Grade.belongsTo(Student, { foreignKey: "student_id" });
  Grade.belongsTo(Course, { foreignKey: "course_id" });
  Course.hasMany(Grade, { foreignKey: "course_id" });
};

export default defineAssociations;
