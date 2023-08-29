
const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense-data','root','12345mysqldb',{
    dialect:'mysql',
    host:'localhost'});


module.exports = sequelize;