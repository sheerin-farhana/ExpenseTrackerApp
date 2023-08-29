const Sequelize = require('sequelize');

const sequilize = require('../util/database');

const Expenses = sequilize.define('expensedata',{
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull:false,
        primaryKey:true
    },
    amount:Sequelize.INTEGER,
    description:Sequelize.STRING,
    category:Sequelize.STRING
});


module.exports = Expenses;