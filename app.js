const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMembers = [];
const idArray = [];
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)


var questions = [{
    name: "name",
    message: "What is your manager's name?",
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
    message: "What is your manager's id?",
    type: "input",
    validate: function (value) {
        var pass = value.match(
        /^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i
        );
        if (pass) {
        return true;
        }

        return 'Please enter a valid number';
    },

},
{
    name: "email",
    message: "What is manager's email?",
    type: "input"
},
{
    name: "officeNumber",
    message: "What is your manager's office number?",
    type: "input",
},
{
    name: "teamMember",
    message: "What type of team member would you like to add?",
    type: "list",
    choices: ["Engineer", "Intern", "I don't want to add any more team members"]
}

]

async function askQuestions() {
const answers = await inquirer.prompt(questions);
console.log(answers);

// new Employee(answers.name, answers.id, answers.email)
// console.log(new Employee);

// const htmlString = passAnswers(answers);
}

// inquirer
// .prompt([
//     {
//         name: "name",
//         message: "What is your manager's name?",
//         type: "input",
//         validate: answer => {
//             if (answer !== "") {
//                 return true;
//             }
//             return "This field can't be empty";
//         }
//     }, 
//     {
//         name: "id",
//         message: "What is your manager's id?",
//         type: "input",
//         validation: answer => {
//             const numbers = /^[0-9]+$/;
//             if (answer.value.match(numbers)) {
//                 return true;
//             }
//             return false;
//         }
    
//     },
//     {
//         name: "email",
//         message: "What is manager's email?",
//         type: "input"
//     },
//     {
//         name: "officeNumber",
//         message: "What is your manager's office number?",
//         type: "input"
//     }
// ])
// .then(
//     answers => {
//         console.log(answers);
//     }
// )
// .catch( error => {
//     if(error.isTtyError) {
//         console.log("wrong");
//     }
//     else {
//         console.log("success");
//     }
// });



askQuestions();

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
