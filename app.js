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

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
////////////////////////////////////////////////////////////
//Inquirer Prompts for Employee Type
//How do I run this so prompts ask about specific employee type?
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
//What Type of function do I write to render html page?
//Code I almost adapted for readme homework
//async function init() {
//  console.log("Hi");
//  try {
//    const answers = await promptUser();
//
//    const html = generateHTML(answers);
//
//    await writeFileAsync("team.html", html);
//
//    console.log("Successfully wrote to index.html");
//  } catch (err) {
//    console.error(err);
//  }
//}
//
//init();
//Code I used to generate readme
//promptUser()
//  .then((responses) => {
//    const md = generateMarkdown(responses);
//    return writeFileAsync("README2.md", md);
//  })
//  .then(() => {
//    console.log("Successfully wrote to README.md");
//  })
//  .catch((err) => {
//    console.log(err);
//  });
//
//Employees Variable (Empty)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
