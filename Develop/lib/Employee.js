// TODO: Write code to define and export the Employee class

class Employee {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    getName() {}
    getId() {}
    getEmail() {}
    getRole() {
        return "Employee"
    } 


}

module.exports = Employee;