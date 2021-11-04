// Dependencies 
const inquirer =require ('inquirer');
const mysql= require('mysql2');
const table = require('console.table');
//const express = require('express');
// const connection = require("./config/connection")

// Express app for Listner 3001
// const PORT = process.env.PORT || 3001;
// const app = express();

// Middleware
// app.use(express.urlencoded({extended: false}));
// app.use(express.json());

// Connecting to the DB database
const connection= mysql.createConnection(
    {
        host:'localhost',
        user: 'root',
        password:'pass',
        database: 'company_db' 
    },
    console.log('Connected to the company_db.')
);

// Calling function globally in the file to start application
mainList();

// INSERTS QUESTIONS TO USERS HERE 
function mainList() {
    inquirer.prompt([
        { // Displays user prompts 
            type: "list",
            name: "mainList",
            message: "Please choice from the main menu: ",
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
    .then(function(input) {
        switch (input.mainList) {
            case "View all departments":
                viewAllDepartments();
                break;
            case "Add department":
                addDepartment();
                break;
            case "View all employee":
                viewAllEmployees();
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
            case 'Delete Department':
                deleteDepartment();
            break;
            case 'Delete Employee':
                deleteEmployee();
            break;
            case 'Delete Role':
                deleteRole();
            break;
            case "Exit":
                exitApp();
                break;
                default:
                    console.log("Warning: Selection was unknown.");
        }
    })
};

// viewAllDepartments();

function viewAllDepartments() {
    const query = 'SELECT * FROM departments';
    connection.query(query, function(err,res) {
        if(err){
            console.log(err)
        } else {
            console.log(res)
            console.table(res);
            mainList();
        }
    })
};

// This function will allow display prompts to the user to input new department to the employee database
function addDepartment(){
    inquirer.prompt([
        {
            type:'input',
            name: 'newDepartment',
            message:'Please enter new department: '
        }
    ]).then (function (input){
        connection.query(`INSERT INTO departments (name) VALUES ('${input.newDepartments}');`, (err,res)=>
        {
            if(err) throw err;
            console.log('New department was added! ✅ ');
            console.log(res);
            mainList();
        })
    })
};

function viewAllRoles(){
    const query = 'SELECT * FROM roles';
    connection.query(query), (err,res)=> {
        //the error object is being created and is being thrown.
        if(err) throw err;
        // Console.logging res to send back HTTP response
        console.log(res);
        console.table(res);
        mainList();
    }
}

// This function will display prompts to the user to view and add a new role to the employee database 

function addRole(){
    connection.query('SELECT * FROM departments', (err,data)=> {
        if (err) throw err;
        let deptArray = data.map(function(department){
            return{
                name: department.name,
                value: department.id
            }
        });
        inqurier.prompt([
            {
                type:'input',
                name: 'newRole',
                message: 'Please enter the new role that you want to add:'
            },
            {
                type: 'input',
                name:'newRoleSalary',
                message: 'Please enter the salary for the new role:',
                validate: salaryInput =>{
                    if(isNaN(salaryInput)){
                        console.log('Please enter amount:')
                        return false;
                    } else {
                        return true;
                    }
                }
            },
            {
                type: 'input',
                name: 'departmentId',
                message: 'Please select the department for the new role:',
                choices: deptArray
            }
        ]).then(function(input){
            connection.query(`INSERT INTO roles (title,salary,department_id) VALUES ("${input.newRole}" , "${input.newRoleSalary}", "${input.departmentId}");`, (err,res)=>{
                if (err) throw err;
                console.log('New role was added!  ✅ ');
                console.log(res);
                mainList();
            })
        })
    });
}

// viewAllEmployees();

function viewAllEmployees(){
    const query = ` SELECT employee.id, employee.first_name, employee.last_name,role.salary,role.title,department.name AS department,CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employee
    
    LEFT JOIN role ON employee.role_id =role.id
    LEFT JOIN departments ON role.department_id = department.id
    LEFT JOIN employee manager ON manager.id = employee.manager;`

    connection.query(query,(err,res)=> {
        if(err) throw err;
        console.log(res);
        console.table(res);
        mainList();
    })
};

//This function will allow user to add an employee to the database
// An array of role objects to return VALUES
function addEmployee() {
    const roleArray = [];
    const managerArray = [];
    connection.query('SELECT id, title FROM roles', (err,data)=>{
        if(err) throw err;
        roleArray= data.map(function(role){
            return {
                name: role.title,
                value: role.id
            }
        });
        // An array of manager objects to return VALUES
        connection.query('SELECT id, first_name, last_name FROM employee', (err,data)=>{
            if (err) throw err;
            managerArray=data.map(function(employee){
                return{
                    name: employee.first_name + " " + employee.last_name,
                    value: employee.id
                }
            });
            managerArray.push({
                value:null,
                name: 'None'
            })
            // Prompts that will display  to the user when  adding an employee 
            inqurier.prompt([
                {
                    type: 'input',
                    name: 'newFirstName',
                    message: 'Please enter the employee\'s first name:'
                },
                {
                    type: 'input',
                    name: 'newLastName',
                    message: 'Please enter the employee\'s last name:'
                },
                {
                    type: 'list',
                    name: 'employeeRole',
                    message: 'Select the employee\'s role:',
                    choices: roleArray
                },
                {
                    type: 'list ',
                    name: 'employeeManager',
                    message: 'Select the designated manager for the employee:',
                    choices: managerArray
                },
            ]).then(function(input){
                const query = `INSERT INTO employee(first_name,last_name,role_id,manager_id) VALUES (?,?,?,?)`;
                const params = [input.newFirstName, input.newLastName,input.employeeRole,input.employeeManager];
                connection.query(query,params, (err,res)=> {
                    if(err) throw err;
                    console.log('New employee was added! ✅ ');
                    console.log(res);
                    mainList();
                })
            })
        })
    })
}

//This function will allow the user to update the employee's role
function updateEmployeeRole(){
    const roleArray = [];
    const employeeArray = [];
    
    connection.query('SELECT id, title FROM role', (err,data) =>{
        if (err) throw err;
        roleArray = data.map(function(role){
            return {
                name: role.title,
                value: role.id
            }
        });
        connection.query('SELECT id, first_name, last_name FROM employee', (err,data)=>{
            if (err) throw err;
            employeeArray =data.map(function(employee){
                return{
                    name: employee.first_name + " "+ employee.last_name,
                    value: employee.id
                }

            });
            // Prompts that will display to the user when updating the employee's role
            inquirer.prompt([
                {
                    type: 'list',
                    name:'updateEmployee',
                    message: 'Select the employee you would like to update:',
                    choices: employeeArray
                },
                {
                    type: 'list',
                    name: 'newRole',
                    message: 'Select the role that you want to assign to the selected employee:',
                    choices: roleArray
                },
            ]).then(function(input) {
                connection.query(`UPDATE employee SET role_id = "${input.newRole}" WHERE id = "${input.updateEmployee}"`,(err,res)=>{
                    if (err) throw err;
                    console.log('Employee has been updated! ✅ ');
                    mainList();
                })
            })
            
        })
    })
}

// This will allow the user to delete a department from the database
// deleteDepartment();

function deleteDepartment(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'department',
            message: 'Please enter the name of the department you wish to delete: '
        }
    ]).then((input)=>{
        const query = `DELETE FROM department WHERE?`;
        const deleteDept ={
            name: input.department
        };
        connection.query(query,deleteDept,(err,res)=>{
            if(err) throw err;
            console.log('Your selected department has been deleted ! ✅ ');
            mainList();
        })
    })
}

// This function will allow the user to delete an employee 

// deleteEmployee();

function deleteEmployee(){
    inquirer.prompt([
        {
            type: 'input',
            name: 'employeeId',
            message: 'Please enter the employee Id that you wish to delete:'
        }
    ]).then((input)=>{
        const query = `DELETE FROM employee WHERE`;
        const deleteEmployee = {
            id: input.employeeId
        };
        connection.query(query, deleteEmployee, (err,res)=> {
            if(err) throw err;
            console.log('The selected employee has been deleted! ✅ ');
            mainList();
        })
    })
}

// This function will allow the user to delete a role

// deleteRole();

function deleteRole(){
    inquirer.prompt([
        {
            type: 'input',
            name:'role',
            message: 'Please enter the role id that you wish to delete:'
        }
    ]).then((input)=>{
        const query = `DELETE FROM role WHERE?`;
        const deleteRoleId = {
            id: input.role
        };
        connection.query(query,deleteRoleId, (err,res)=>{
            if (err) throw err;
            console.log('The selected role has been deleted! ✅ ');
            mainList();
        })
    })
}

// connection.connect((err)=>{
//     if(err) throw err;
//     console.log(`Connected to the company_db database`);
//     options();
// })

// This will end the application and prompt to the user that they have exited. 
exitApp = () => {
    console.log('Thank you for visting!✌️');
    connection.end();
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