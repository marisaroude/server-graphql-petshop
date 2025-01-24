const { Sequelize } = require('sequelize')
require('dotenv').config()

const { PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, PG_HOST } = process.env

const sequelize = new Sequelize(PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, {
  host: PG_HOST,
  dialect: 'postgres',
})

const Persona = require('./Persona')(sequelize, Sequelize)
const Mascota = require('./Mascota')(sequelize, Sequelize)

//belongsTo :
//1. Declares that an instance of this model is related to an instance of another model.
//2. Automatically adds the foreign key column in the table of the model that calls belongsTo.
//3. Adds methods that you can use to work with the relationship, such as get, set, and create.
Mascota.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })
// hasMany:
//It is used in the model that has many related instances (e.g., a person has many pets).
Persona.hasMany(Mascota, { foreignKey: 'id_persona', as: 'mascotas' })

//we don't need to create the tables, because we already have them created
sequelize.sync({ force: false })

module.exports = { sequelize, Persona, Mascota }
