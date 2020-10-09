// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");


class Manager extends Employee {
    constructor (name, id) {
    super (name, id);
    this.officeNumber = officeNumber;
}
}

const manager = new Manager(name, id);