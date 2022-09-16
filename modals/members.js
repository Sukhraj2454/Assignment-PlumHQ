const { DataTypes } = require('sequelize')
const { sequelize } = require('../connectors/DBConnector')


const Organisation = require('./organisations')

const Member = sequelize.define('Member', {
    EmployeeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    org_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    MiddleName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    DOB: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false,
        values: ['Male', 'Female', 'Other']
    }
},
    {
        timestamps: false
    })
Member.hasOne(Organisation, {
    foreignKey: 'org_name'
})
Organisation.hasMany(Member, {
    foreignKey: 'org_name'
})

Member.sync({ alter: true })
module.exports = Member