import { Course } from "../model/course-model";
import { Department } from "../model/department-model";
import { Grade } from "../model/grade-model";
import { Professor } from "../model/professor-model";
import { Student } from "../model/student-model";

export const logAssociations = () => {
  const models = [Course, Professor, Department, Student, Grade]; // Add all your models

  models.forEach((model) => {
    console.log(`Associations for ${model.name}:`);

    const associations = Object.keys(model.associations);

    if (associations.length === 0) {
      console.log(`- No associations found for ${model.name}.`);
    } else {
      associations.forEach((assoc) => {
        const associationDetails = model.associations[assoc];
        const type = associationDetails.associationType; // Get the association type

        console.log(`- ${assoc}:`);
        console.log(`  Type: ${type}`);
        console.log(`  Target Model: ${associationDetails.target.name}`);
        console.log(`  Options:`, associationDetails.foreignKey); // Show any options set on the association
      });
    }

    console.log(""); // Add a newline for better readability
  });
};
