INSERT INTO department (name)
VALUE ("Hokage"),
            ("Kage"),
             ("Chuunin "),
             ("Jounin"),
             ("Genin");

INSERT INTO role(title,salary,department_id)
VALUES  ('Hokage', 450000,1),
                ('Kage',50000,2),
                ('Chuunin',10000,4)
                ('Jounin',40000,3)
                ('Genin Handler'55000,5)

INSERT INTO employees (first_name,last_name,roles_id,manager_id)
VALUES  ('Naruto', 'Uzumaki',1,NULL),
                ( 'Sasuke' , 'Uchiha',2, NULL),
                ('Itachi', 'Uchiha',3, NULL),
                ('Kakashi', 'Hatake',4, NULL),
                ('Hinata', 'Hyuga',5,NULL),
                ('Pervy','Sage',6,NULL),
                ('Grandma', 'Tsunade',7,NULL)
                ('Sakura','Haruno',8,NULL),
                ('Rock','Lee',9,NULL)
                ('Ino','Yamanka',10,NULL),
                ('Neji','Hyuga',11,NULL),
                ('Kiba', 'Inuzuka',12,NULL),
                ('Kabuto','Yakushi',13, NULL);
        
        -- TODO--
        -- Need to create role id and manger ids