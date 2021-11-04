INSERT INTO department (name)
VALUE ("Hokage"),  --manager--
            ("Kage"), --sales--
             ("Chuunin "), --accountant--
             ("Jounin"), --warehouse rep--
             ("Genin"); --warehouse handler--

INSERT INTO role(title,salary,department_id)
VALUES  ('Hokage', 450000,1),
                ('Kage',50000,2),
                ('Chuunin',10000,3)
                ('Jounin',40000,4)
                ('Genin Handler'55000,5)

INSERT INTO employees (first_name,last_name,roles_id,manager_id)
VALUES  ('Naruto', 'Uzumaki',1,NULL),
                ( 'Sasuke' , 'Uchiha',2, 1),
                ('Itachi', 'Uchiha',3, 2),
                ('Kakashi', 'Hatake',4, NULL),
                ('Hinata', 'Hyuga',5,3),
                ('Pervy','Sage',6,1),
                ('Grandma', 'Tsunade',7,4)
                ('Sakura','Haruno',8,5),
                ('Rock','Lee',9,6);
        
        -- TODO--
        -- Need to create role id and manger ids
  