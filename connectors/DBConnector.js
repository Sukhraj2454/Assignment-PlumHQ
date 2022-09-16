const { Sequelize } = require('sequelize');

const user = process.env.DBUSER
const password = process.env.DBPASSWORD
const database = process.env.DATABASE


const sequelize = new Sequelize(database, user, password, {
    host: process.env.DBHOST,
    dialect: 'postgres'
});

const check = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully with postgres.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

check();

module.exports = { sequelize }