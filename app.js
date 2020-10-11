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

const questions = [
    {
        name: "name",
        message: "What is your Manager's name?",
        type: "input",
        validate: answer => {
            if (answer !== "") {return true}
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Manager's ID?",
        type: "input",
        // validate: value => {
        //     var pass = value.match(/^([01]{1})?[-.\s]?\(?(\d{3})\)?[-.\s]?(\d{3})[-.\s]?(\d{4})\s?((?:#|ext\.?\s?|x\.?\s?){1}(?:\d+)?)?$/i);
        //     if (pass) {return true}
        //     return 'Please enter a valid number';
        // },
    },
    {
        name: "email",
        message: "What is Manager's email?",
        type: "input"
    },
    {
        name: "officeNumber",
        message: "What is your Manager's office number?",
        type: "input",
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
            if (answer !== "") {return true}
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Engineer's ID?",
        type: "input",
        // validate: answer => {
        //     const pass = answer.match(
        //         /^[1-9]\d*$/
        //     );
        //     if(pass) {
        //         if(idArray.includes(answer)) {
        //             return "This ID is already taken."
        //         }
        //         else {
        //             return true;
        //         }
        //     }
        //     return "Please enter a positive number greater than zero."
        // }
    },
    {
        name: "email",
        message: "What is Engineer's email?",
        type: "input"
    },
    {
        name: "github",
        message: "What is your Engineer's github profile?",
        type: "input"
    },
    {
        name: "name",
        message: "What is your Intern's name?",
        type: "input",
        validate: answer => {
            if (answer !== "") {return true}
            return "This field can't be empty";
        }
    },
    {
        name: "id",
        message: "What is your Intern's ID?",
        type: "input",
    },
    {
        name: "email",
        message: "What is Intern's email?",
        type: "input"
    },
    {
        name: "school",
        message: "What is your Intern's school?",
        type: "input"
    }
]

function createManager(){
    inquirer.prompt(
        [
            questions[0], questions[1], questions[2], questions[3]
    ]).then(answers => {
        const manager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber);
        teamMembers.push(manager);
        idArray.push(answers.id);
        chooseTeam()
    }
        )
        .catch(error => {
            if(error.isTtyError) {console.log("wrong")}
            else {console.log("somethign else wrong")}
        })

}

// async function createEngineer(questions) {
//     const answers = await inquirer.prompt(questions);
//     const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
//     teamMembers.push(engineer);
//     idArray.push(answers.id);
//     chooseTeam();
// }


function chooseTeam() {
    inquirer.prompt(
        [
            questions[4]
    ]).then(answer => {
        if(answer.teamMember === "Engineer") {
            addEngineer();
        }
        else if (answer.teamMember === "Intern") {
            addIntern();
        }
        else {buildTeam()}
    }
    )
        
}

function addEngineer() {
    inquirer.prompt(
        [
            questions[5], questions[6], questions[7], questions[8]
    ]).then(answers => {
        const engineer = new Engineer(answers.name, answers.id, answers.email, answers.github);
        teamMembers.push(engineer);
        idArray.push(answers.id);
        chooseTeam()}
        )
        .catch(error => {
            if(error.isTtyError) {console.log("wrong")}
            else {console.log("somethign else wrong")}
        })
}

function addIntern() {
    inquirer.prompt(
        [
            questions[9], questions[10], questions[11], questions[12]
    ]).then(answers => {
        const intern = new Intern(answers.name, answers.id, answers.email, answers.school);
        teamMembers.push(intern);
        idArray.push(answers.id);
        chooseTeam()}
        )
        .catch(error => {
            if(error.isTtyError) {console.log("wrong")}
            else {console.log("somethign else wrong")}
        })
}

createManager();



// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

function buildTeam() {

        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
    
    console.log(teamMembers);
    console.log(idArray);
    console.log("ready to build team");

    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");

}

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
