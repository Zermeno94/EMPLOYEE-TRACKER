require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PW,

  {
      host: 'localhost',
      dialect :'mysql',
      port :  3306,
    //   Port 3306 is the default port for the classic MySQL protocol (port), which is used by the mysql client, MySQL Connectors, and utilities such as mysqldump and mysqlpump
    }
);

module.exports = sequelize;