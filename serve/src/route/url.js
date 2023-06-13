const Sequelize = require('sequelize');
const database = require('./database');

const url = database.define('urls', {
    id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    originalUrl:{
        type: Sequelize.STRING,
        allowNull: false
    },
    shortUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    visits : {
     type: Sequelize.INTEGER.UNSIGNED,
     allowNull: true,
     defaultValue: 0
    },
    title: {
       type: Sequelize.STRING 
    }
})