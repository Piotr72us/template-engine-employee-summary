// require class Object prototypes (blueprints) that enable to create instances of objects
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

// require necessary dependencies for asking questions and saving user's input
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

// path to folder and file that will display generated answers
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// file containing JavaScript generating HTML elements from user's input
const render = require("./lib/htmlRenderer");

// array with objects containing desired team members
const teamMembers = [];
// array with all members' IDs
const idArray = [];

// array containing 12 questions for Manager, Engineers, and Interns, and a question whether to add another Team Member
// questions are validated to meet required criteria
const questions = [
    {
        name: "name",
        message: "What is your Manager's name?",
        type: "input",
        validate: answer => {
            if (answer !== "") {
                return true
            }
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Manager's ID?",
        type: "input",
        validate: value =>
            new Promise((resolve) => {
                setTimeout(
                    () => resolve(!Number.isNaN(Number(value)) && value.length === 4 || "Your ID has 4 digits"),
                        50
            );
        })
    },
    {
        name: "email",
        message: "What is Manager's email?",
        type: "input",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if(pass) {
                return true;
            }
            return "Please enter a valid email address";
        }
    },
    {
        name: "officeNumber",
        message: "What is your Manager's office number?",
        type: "input",
        validate: value =>
        new Promise((resolve) => {
            setTimeout(
                () => resolve(!Number.isNaN(Number(value)) && value.length === 3 || "Your Office Number has 3 digits"),
                    50
            );
        })
    },
    {
        name: "teamMember",
        message: "What type of team member would you like to add?",
        type: "list",
        choices: ["Engineer", "Intern", "I don't want to add any more team members"]
    },
    {
        name: "name",
        message: "What is your Engineer's name?",
        type: "input",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Engineer's ID?",
        type: "input",
        validate: value =>
        new Promise((resolve) => {
            setTimeout(
                () => resolve(!Number.isNaN(Number(value)) && value.length === 4 && !idArray.includes(value)|| "This ID is incorrect or belongs to someone else. Correct ID has 4 digits"),
                    50
            );
        })
    },
    {
        name: "email",
        message: "What is Engineer's email?",
        type: "input",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if(pass) {
                return true;
            }
            return "Please enter a valid email address"
        }
    },
    {
        name: "github",
        message: "What is your Engineer's github profile?",
        type: "input",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "This field can't be empty";
        }
    },
    {
        name: "name",
        message: "What is your Intern's name?",
        type: "input",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Intern's ID?",
        type: "input",
        validate: value =>
        new Promise((resolve) => {
            setTimeout(
                () => resolve(!Number.isNaN(Number(value)) && value.length === 4 && !idArray.includes(value)|| "This ID is incorrect or belongs to someone else. Correct ID has 4 digits"),
                    50
            );
        })
    },
    {
        name: "email",
        message: "What is Intern's email?",
        type: "input",
        validate: answer => {
            const pass = answer.match(
                /\S+@\S+\.\S+/
            );
            if (pass) {
                return true;
            }
            return "Please enter a valid email address";
        }
    },
    {
        name: "school",
        message: "What is your Intern's school?",
        type: "input",
        validate: answer => {
            if (answer !== "") {
                return true;
            }
            return "This field can't be empty";
        }
    }
]

// function creates a new instance of Manager object based on user's answers; object will be added to teamMembers array
// unique ID is added to idArray
// user can choose to create another Team member
function addManager(){
    inquirer
        .prompt([
            questions[0], questions[1], questions[2], questions[3]
        ])
        .then(answers => {
            const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
            teamMembers.push(manager);
            idArray.push(answers.id);
            chooseTeam();
        });
}

// user chooses whether to add another Engineer or Intern
// if new team member is not chosen, function buildTeam() is executed
function chooseTeam() {
    inquirer
        .prompt([
                questions[4]
        ])
        .then(answer => {
            if(answer.teamMember === "Engineer") {
                addEngineer();
            }
            else if (answer.teamMember === "Intern") {
                addIntern();
            }
            else {
                buildTeam();
            }
        });      
}

// function creates a new instance of Engineer object based on user's answers; object will be added to teamMembers array
// unique ID is added to idArray
// user can choose to create another Team member
function addEngineer() {
    inquirer
        .prompt([
                questions[5], questions[6], questions[7], questions[8]
        ])
        .then(answers => {
            const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
            teamMembers.push(engineer);
            idArray.push(answers.id);
            chooseTeam();
        });
}

// function creates a new instance of Intern object based on user's answers; object will be added to teamMembers array
// unique ID is added to idArray
// user can choose to create another Team member
function addIntern() {
    inquirer.
        prompt([
                questions[9], questions[10], questions[11], questions[12]
        ])
        .then(answers => {
            const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
            teamMembers.push(intern);
            idArray.push(answers.id);
            chooseTeam();
        });
}

// an array of objects (roles) created from user's answers is passed to "render" function so that HTML elements
// can be created from the answers
// this function checks if output folder exists, if not the output folder is created
// new file is created "team.html" with the HTML elements created from user's answers
// new file is properly encoded using "utf8" so that all answers are properly displayed in the browser
function buildTeam() {
    if(!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf8");
}

// Everything begins here! This initiates function in order to create Manager.
addManager();