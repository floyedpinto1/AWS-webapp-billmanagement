const Sequelize = require('sequelize');
const db = require('../config/database');
const bill = require('./bill');

const file = db.define('file', {
    id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
    },
    file_name: {
        type: Sequelize.STRING
    },
    url: {
        type: Sequelize.STRING
    },
    upload_date: {
        type: Sequelize.STRING
    },
    owner_id: {
        type: Sequelize.STRING
    },
    file_size: {
        type: Sequelize.STRING
    },
    encoding: {
        type: Sequelize.STRING   
    }

}, {
    freezeTableName: true,
    timestamps: false
});

module.exports = file;




