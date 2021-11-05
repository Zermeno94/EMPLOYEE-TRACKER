-- Starter of MySQL
DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;
USE company_db;

-- DROP TABLE IF EXISTS department;
-- DROP TABLE IF EXISTS role;

-- Table for Departments 
-- 'name' to hold department name 
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL 
);

-- Table for roles 
-- 'title' to hold role tile
-- 'salary' tol hold role salary 
-- 'department' to hold reference to deparmtent role belongs to
CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE SET NULL
);

-- Table for employess 
-- 'first_name' to hold employee first name 
--  'last_name' to hold employee last name 
--  'role_id' to hold reference to employee role 
--  'manager_id' to hold reference to another employee that is the manager of the current employee ('null' if the employee has no manager)
CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name  DECIMAL(30) NOT NULL,
    roles_id INT,
    FOREIGN KEY (roles_id) REFERENCES roles(id) , manager_id INT,
    FOREIGN KEY (manager_id) REFERENCES employees(id)
);

