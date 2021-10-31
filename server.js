// Dependencies 
const inqurier =require ('inqurier');
const mysql= require('mysql2');
const consoleTable = require('console.table');

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