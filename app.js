const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const outputPath = path.resolve(__dirname, "output", "team.html");

const render = require("./lib/htmlRenderer");
let employeeArr = []; //this is the array i'm trying to push the team to for publishing somehow but i need to JSON object somewhere maybe??? idk

//function for prompts
const promptTeam = function() {
    inquirer
    .prompt([
        //user input- prompt for email, id, and specific role based info
        {
            type: "input",
            message: "Team member name?",
            name: "name"
        },
        {
            type: "input",
        message: "Team member ID?",
        name: "id"
    },
    {
        type: "input",
        message: "Team member email?",
        name: "email"
    },
    {
        type: "list",
        message: "Team member role?",
        name: "role",
        choices: ["Manager", "Engineer", "Intern"]
    },
]).then(function(data) {
    if (data.name === "") {
        console.log("Name must exist.");
        promptTeam();
        return
    };
    //specific manager things
    if (data.role === "Manager") {
        inquirer.prompt([
            {
                type: "input",
                message: "Office number?",
                name: "officenum"
            },
            
        ]).then(function(mdata) {
            let manager = new Manager(data.name, data.id, data.email, mdata.officenum);
            employeeArr.push(manager);
            console.log(`aw yiss: ${manager.getName()} success`);
            agian();
        })
    }
    else if (data.role === "Engineer") {
        //specific engineer things
        inquirer.prompt([
            {
                type: "input",
                message: "GitHub username?",
                name: "github"
            },
            
        ]).then(function(edata) {
            let engineer = new Engineer(data.name, data.id, data.email, edata.github);
            employeeArr.push(engineer);
            console.log(`aw yiss: ${engineer.name} and ${engineer.github} success`)
            agian();
            console.log(`array is ${employeeArr}`);
        })
    }
    else if (data.role === "Intern") {
        //specific intern things
        inquirer.prompt([
            {
                type: "input",
                message: "School?",
                name: "school"
            },
            
        ]).then(function(idata) {
            let intern = new Intern(data.name, data.id, data.email, idata.school);
            employeeArr.push(intern);
            console.log(`array is ${JSON.stringify(employeeArr)}`);
            agian();
        })
    }
    
    
    
})
}

promptTeam();
//the repeat to add another or render out
const agian = function() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Add another team member?",
            name: "add"
        }
    ]).then(function(data) {
        if (data.add === true) {
            promptTeam();
        } else
        fs.writeFileSync(outputPath, render(employeeArr));
        console.log(`final array is ${employeeArr}`);
})
}


