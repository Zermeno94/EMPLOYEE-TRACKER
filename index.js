// Dependencies 
const inqurier =require ('inqurier');
const mysql= require('mysql2');
const table = require('console.table');
const connection =require('./config/connection');
const { exit } = require('process');

// Express app for Listner 3001
// const PORT = process.env.PORT || 3001;

// Middleware
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// Connecting to the DB database
const db= mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'',
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
                    "Error";
        }
    })
};







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