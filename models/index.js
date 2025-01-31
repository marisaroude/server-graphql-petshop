const { Sequelize } = require('sequelize')
require('dotenv').config()

const { PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, PG_HOST } = process.env

const sequelize = new Sequelize(PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, {
  host: PG_HOST,
  dialect: 'postgres',
})

const Persona = require('./Persona')(sequelize, Sequelize)
const Mascota = require('./Mascota')(sequelize, Sequelize)
const Proveedor = require('./Proveedor')(sequelize, Sequelize)
const ProductoServicio = require('./ProductoServicio')(sequelize, Sequelize)
const IngresoProducto = require('./IngresoProducto')(sequelize, Sequelize)
const Promocion = require('./Promocion')(sequelize, Sequelize)
const Carrito = require('./Carrito')(sequelize, Sequelize)
const ProductoCarrito = require('./ProductoCarrito')(sequelize, Sequelize)
//belongsTo :
//1. Declares that an instance of this model is related to an instance of another model.
//2. Automatically adds the foreign key column in the table of the model that calls belongsTo.
//3. Adds methods that you can use to work with the relationship, such as get, set, and create.
// hasMany:
//It is used in the model that has many related instances (e.g., a person has many pets).

//Una persona tiene varias mascotas
Mascota.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })
Persona.hasMany(Mascota, { foreignKey: 'id_persona', as: 'mascotas' })

IngresoProducto.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})
IngresoProducto.belongsTo(Proveedor, {
  foreignKey: 'id_proveedor',
  as: 'proveedor',
})

ProductoServicio.hasMany(IngresoProducto, {
  foreignKey: 'id_ip',
  as: 'ingreso_producto',
})
Proveedor.hasMany(IngresoProducto, {
  foreignKey: 'id_ip',
  as: 'ingreso_producto',
})

Promocion.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})
ProductoServicio.hasMany(Promocion, {
  foreignKey: 'id_promocion',
  as: 'promocion',
})

Carrito.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })
Persona.hasOne(Carrito, { foreignKey: 'id_carrito', as: 'carrito' })

ProductoCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito', as: 'carrito' })
ProductoCarrito.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})

Carrito.hasMany(ProductoCarrito, {
  foreignKey: 'id_pc',
  as: 'producto_carrito',
})
Carrito.hasMany(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})

//we don't need to create the tables, because we already have them created
sequelize.sync({ force: false })

module.exports = {
  sequelize,
  Persona,
  Mascota,
  Proveedor,
  ProductoServicio,
  IngresoProducto,
  Promocion,
  Carrito,
  ProductoCarrito,
}
