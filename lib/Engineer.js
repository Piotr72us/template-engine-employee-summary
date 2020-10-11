// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Engineer extends Employee {
    constructor(name, id, email, github) {
    super(name, id, email);
    this.github = github
    this.email = email;
}

getRole() {
    return "Engineer";
}

getGithub() {
 return this.github;
}
}

// const employee = new Engineer(name, id, email, github);

module.exports = Engineer;