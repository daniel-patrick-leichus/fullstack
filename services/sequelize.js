const Sequelize = require('sequelize');
const keys = require('../config/keys');

const sequelize = new Sequelize(keys.mysqlURI);

const db = {
  sequelize: sequelize,
  Sequelize: Sequelize
}

module.exports = db;
