INSERT INTO departments(departments_name)
VALUES
            ("Managment"),  
            ("Accountant"), 
             ("Data Anaylst"),
             ("Marketing"), 
             ("Sales"); 

INSERT INTO roles (title,salary,departments_id)
VALUES  ('CEO', 450000,1),
                ('Regional Manager',50000,2),
                ('Content Marketing Manager',10000,3),
                ('Marketing Assistant',40000,4),
                ('Sales Manager',55000,5),
                ('Sales Representative',55000,5);

INSERT INTO employees (first_name,last_name,roles_id,manager_id)
VALUES  ('Naruto', 'Uzumaki',1,NULL),
                ( 'Sasuke' , 'Uchiha',2, 1),
                ('Itachi', 'Uchiha',3, 2),
                ('Kakashi', 'Hatake',4, 4),
                ('Hinata', 'Hyuga',5,3),
                ('Pervy','Sage',6,1),
                ('Grandma', 'Tsunade',0,4),
                ('Sakura','Haruno',3,5),
                ('Rock','Lee',4,6);
        
