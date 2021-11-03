// Dependencies 
const inqurier =require ('inqurier');
const mysql= require('mysql2');
const table = require('console.table');
const { query} = require('process');
const express = require('express');


// Express app for Listner 3001
const PORT = process.env.PORT || 3001;
const app = express();

// Middleware
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Connecting to the DB database
const db= mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'HiddenLeaf_04',
        database: 'company_db' 
    },
    console.log('Connected to the company_db.')
);

// INSERTS QUESTIONS TO USERS HERE 

const userQuestions = () => {
    inqurier.prompt([
        { // Displays user prompts 
            type: "list",
            name: "choices",
            message: "Please select from the selection: ",
            choices:[
                "View all departments",
                "Add department",
                "View all employee",
                "Add employee",
                "Update employee role ",
                "View all roles",
                "Add role",
                "Exit"
            ]
        },
    ]) // Prompts based on user's selection
    .then(answer => {
        switch (userQuestions) {
            case "View all departments":
                allDepartments();
                break;
            case "Add deparment":
                addDepartment();
                break;
            case "View all employee":
                allEmployee();
                break;
            case "Add employee":
                addEmployee();
            case "Update employee role":
                updateEmployeeRole();
                break;
            case "View all roles":
                viewAllRoles();
                break;
            case "Add role":
                addRole();
                break;
            case "Exit":
                exit();
                break;
                default:
                    console.log("Warning: Selection was unknown.");
        }
    })
};

function viewAllDepartments() {
    const query = 'SELECT * FROM department';
    connection.query(query, function(err,rest) {
        if(err){
            console.log(err)
        } else {
            console.log(res)
            console.table(res);
            options();
        }
    })
};

// This function will allow display prompts to the user to input new department to the employee database
function addDepartment(){
    inqurier.prompt([
        {
            type:'input',
            name: 'newDepartment',
            message:'Please enter new department: '
        }
    ]).then (function (input){
        connection.query(`INSERT INTO department (name) VALUES ('${input.newDepartment}');`, (err,res)=>
        {
            if(err) throw err;
            console.log('New department was added! ✅ ');
            console.log(res);
            options();
        })
    })
};

function viewAllRoles(){
    const query = 'SELECT * FROM role';
    connection.query(query), (err,res)=> {
        if(err) throw err;
        console.log(res);
        console.table(res);
        options();
    }
}

// This function will allow display prompts to the user to view and add a new role to the employee database 
function addRole(){
    const query = 'SELECT * FROM department',  ( err,data)=>{
        if (err) throw err;
        let deptArray = data.map(function(department){
            return{
                name: department.name,
                value: department.id
            }
        } );
        inqurier.prompt([
            {
                type: 'input',
                name: 'newRole',
                message: 'Please enter the role you wish to add: '

            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: 'Please enter the salary for the new role:',
                validate: salaryInput => {
                    if(isNaN(salaryInput)){
                        console.log('Please enter a salary.')
                        return false;
                    } else{
                        return true;
                    }
                }
            },
            {
                type:'list',
                name:'departmentId',
                message: ' Please select the department that the new role will be added too:',
                choices: deptArray
            }
        ]).then (function(input){
            connection.query(`INSERT INTO role (title,salary,department_id,) VALUES('${input.newRole}', '${input.newRoleSalary}', '${input.departmentId}'); `, (err,res)=> {
                if (err) throw err;
                console.log('New role has been added! ✅');
                console.log(res);
                options();
            })
        })
    });
}





// TODO LIST 
//THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
//WHEN I choose to view all departments
//THEN I am presented with a formatted table showing department names and department ids
//WHEN I choose to view all roles
//THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
//WHEN I choose to view all employees
//THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
//WHEN I choose to add a department
//THEN I am prompted to enter the name of the department and that department is added to the database
//WHEN I choose to add a role
//THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
//WHEN I choose to add an employee
//THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
//WHEN I choose to update an employee role
//THEN I am prompted to select an employee to update and their new role and this information is updated in the database 