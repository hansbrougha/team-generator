//Dependencies
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

//NPM Packages
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Render Path
//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");

//Employees Variable (Empty)
const employees = [];
const outputPath = path.resolve(__dirname, "output", "team.html");

//Prompt User to Add a Team Member.
function promptUser() {
  return inquirer
    .prompt([
      {
        type: "list",
        name: "role",
        message: "Which type of team member would you like to add?",
        choices: [
          "Manager",
          "Engineer",
          "Intern",
          "I don't want to add any more team members.",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.role) {
        case "Engineer":
          promptEngineer();
          break;
        case "Intern":
          promptIntern();
          break;
        case "Manager":
          promptManager();
          break;
        case "I don't want to add any more team members.":
          console.log("Team Complete!");
          buildTeam();
          break;
        default:
          buildTeam();
      }
    });
}
function buildTeam() {
  fs.writeFileSync(outputPath, render(employees), "utf-8");
}
//Inquirer Prompts for Manager////////////////////////////
function promptManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your manager's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your manager's id?",
      },
      {
        type: "input",
        message: "What is your manager's email?",
        name: "email",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is your manager's office number?",
      },
    ])
    .then((answers) => {
      const manager = new Manager(
        answers.name,
        answers.id,
        answers.email,
        answers.officeNumber
      );
      employees.push(manager);
      promptUser();
    });
}
//Inquirer Prompts for Engineer//////////////////
function promptEngineer() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your engineer's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your engineer's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your engineer's email?",
      },
      {
        type: "input",
        name: "github",
        message: "What is your engineer's Github username?",
      },
    ])
    .then((answers) => {
      const engineer = new Engineer(
        answers.name,
        answers.id,
        answers.email,
        answers.github
      );
      employees.push(engineer);
      promptUser();
    });
}
//Inquirer Prompts for Intern///////////////////////
function promptIntern() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is your intern's name?",
      },
      {
        type: "input",
        name: "id",
        message: "What is your intern's id?",
      },
      {
        type: "input",
        name: "email",
        message: "What is your intern's email?",
      },
      {
        type: "input",
        name: "school",
        message: "Where does your intern go to?",
      },
    ])
    .then((answers) => {
      const intern = new Intern(
        answers.name,
        answers.id,
        answers.email,
        answers.school
      );
      employees.push(intern);
      promptUser();
    });
}
promptUser();
//////////////////////////////////////////
