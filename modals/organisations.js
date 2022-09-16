const { DataTypes } = require('sequelize')

const { sequelize } = require('../connectors/DBConnector')

const Organisations = sequelize.define('Organisations', {
    org_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        primaryKey: true
    }
},
    {
        timestamps: false
    })

Organisations.sync({ alter: true })
module.exports = Organisations