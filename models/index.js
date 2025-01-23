const { Sequelize } = require('sequelize')
require('dotenv').config()

const { PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, PG_HOST } = process.env

const sequelize = new Sequelize(PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, {
  host: PG_HOST,
  dialect: 'postgres',
})

const Persona = require('./Persona')(sequelize, Sequelize)

//we don't need to create the tables, because we already have them created
sequelize.sync({ force: false })

module.exports = { sequelize, Persona }
