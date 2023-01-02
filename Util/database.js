const Sequelize = require('sequelize');

const sequelize = new Sequelize('groupchat','root','zeeshansk', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;

