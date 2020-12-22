// Required constant variables 
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const roles = [];

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


// Manager object questions

const managerQuest = [
    {
        type: 'input',
        name: 'name',
         message: "What is your manager's name?"
    },
        
    {
        type: 'number',
        name: 'id',
        message: "What is your manager's id?"
    },
        
    {
        type: 'input',
        name: 'email',
        message: "What is your manager's email?",
    },
        
    {
        type: 'number',
        name: 'officeNumber',
        message: "What is your manager's office number?",          
    },
        
    {                      
        type: 'list',
        name: 'teamMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', "I don't want to add any more team members"]
    },     

];

// Engineer object questions

const engineerQuest = [
    {
        type: 'input',
        name: 'name',
        message: "What is your engineer's name?"
    },

    {
        type: 'input',
        name: 'role',
        message: "What is your engineer's role?",
    },

    {
        type: 'number',
        name: 'id',
        message: "What is your engineer's id?"
    },

    {
        type: 'input',
        name: 'email',
        message: "What is your engineer's email?",
    },

    {
        type: 'input',
        name: 'github',
        message: "What is your engineer's Github username?",          
    },

    {                      
        type: 'list',
        name: 'teamMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer','Intern', "I don't want to add any more team members"]
    },   

];

// Intern object questions

const internQuest = [
    {
        type: 'input',
        name: 'name',
        message: "What is your intern's name?"
    },

    {
        type: 'input',
        name: 'role',
        message: "What is your intern's role?",
    },

    {
        type: 'number',
        name: 'id',
        message: "What is your intern's id?"
    },

    {
        type: 'input',
        name: 'email',
        message: "What is your intern's email?",
    },

    {
        type: 'input',
        name: 'school',
        message: "What is your intern's school name?",          
    },

    {                      
        type: 'list',
        name: 'teamMember',
        message: 'Which type of team member would you like to add?',
        choices: ['Engineer', 'Intern', "I don't want to add any more team members"]
    }, 

];

// Function prompting manager questions

function managerInfo() {
    inquirer
    .prompt(managerQuest)
    .then(function(answer) {
        const manager = new Manager (answer.id, answer.name, answer.email, answer.officeNumber);    
        roles.push(manager);

        if(answer.teamMember === 'Engineer') {
            createEngineer();
        }else if(answer.teamMember === 'Intern') {
            createIntern();
        }else(makeTeam());
    })
}

managerInfo();

// Function prompting Engineer question

function createEngineer() {
    inquirer
    .prompt(engineerQuest)
    .then(function(answer) {
        const engineer = new Engineer (answer.name, answer.id, answer.email, answer.github);
        roles.push(engineer);

        if(answer.teamMember === 'Engineer') {
            createEngineer();
        }else if(answer.teamMember === 'Intern') {
            createIntern();
        }else(makeTeam());
    })
}

// Function prompting Intern question

function createIntern() {
    inquirer
    .prompt(internQuest)
    .then(function(answer) {
        const intern = new Intern (answer.name, answer.id, answer.email, answer.school);
        roles.push(intern);

        if(answer.teamMember === 'Engineer') {
            createEngineer();
        }else if(answer.teamMember === 'Intern') {
            createIntern();
        }else(makeTeam());
    })
}

// Function for creating teams and rendering page

function makeTeam() {
    const myTeam = render(roles);

    fs.writeFile(outputPath, myTeam, "utf8", (err) => {
        if (err) throw err;
        console.log('File saved!');
    });
}



// inquirer.prompt(managerQuest).then(function (answer) {
//         console.log(answer);
        
//         const manager = new Manager (answer.id, answer.name, answer.email, answer.officeNumber);    
//         roles.push(manager);
        

//         if(answer.teamMember === "Engineer") {
//             console.log("it worked")
//             inquirer.prompt(engineerQuest).then(function (answer) {
//                 console.log(answer);

//                 const engineer = new Engineer (answer.name, answer.id, answer.email, answer.github);
//                 roles.push(engineer);

//                 if(answer.teamMember === "Intern") {
//                     console.log("it worked again")
//                     inquirer.prompt(internQuest).then(function (answer) {
//                         console.log(answer)

//                         const intern = new Intern (answer.name, answer.id, answer.email, answer.school);
//                         roles.push(intern);
//                         return;
//                     })
//                 }else if(answer.teamMember === "Engineer") {
//                     console.log('terminate')
//                     inquirer.prompt(confirm).then(function(answer){
//                         console.log(answer);


//                     })
//                     return;

//                 }else{
//                     console.log('Render');
//                     // render();
//                 }
                
//             })
//         }else if(answer.teamMember === "Intern") {
//             console.log("it worked again and again")
//             inquirer.prompt(internQuest).then(function (answer) {
//                 console.log(answer)

//                 const intern = new Intern (answer.name, answer.id, answer.email, answer.school);
//                 roles.push(intern);

//                 if(answer.teamMember === 'Engineer') {
//                     console.log("it still worked")

//                     inquirer.prompt(engineerQuest).then(function(answer) {
//                         console.log(answer);

//                         const engineer = new Engineer (answer.name, answer.id, answer.email, answer.github);
//                         roles.push(engineer);

//                     })
//                 }
//             })
//         }else{            
//             console.log("I don't want to add any more team members")
//             // render();
            
//             }

//     })

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
