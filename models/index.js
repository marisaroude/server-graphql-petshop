const { Sequelize } = require('sequelize')
require('dotenv').config()

const { PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, PG_HOST } = process.env

const sequelize = new Sequelize(PG_NAME_DB, PG_ROLE_DB, PG_PASSWORD_DB, {
  host: PG_HOST,
  dialect: 'postgres',
})

// Importar modelos
const Persona = require('./Persona')(sequelize, Sequelize)
const Mascota = require('./Mascota')(sequelize, Sequelize)
const Proveedor = require('./Proveedor')(sequelize, Sequelize)
const ProductoServicio = require('./ProductoServicio')(sequelize, Sequelize)
const IngresoProducto = require('./IngresoProducto')(sequelize, Sequelize)
const Promocion = require('./Promocion')(sequelize, Sequelize)
const Carrito = require('./Carrito')(sequelize, Sequelize)
const ProductoCarrito = require('./ProductoCarrito')(sequelize, Sequelize)
const Factura = require('./Factura')(sequelize, Sequelize)
const DetalleFactura = require('./DetalleFactura')(sequelize, Sequelize)
const Pago = require('./Pago')(sequelize, Sequelize)
const Pregunta = require('./Pregunta')(sequelize, Sequelize)
const Respuesta = require('./Respuesta')(sequelize, Sequelize)

// Definir relaciones
Persona.hasMany(Mascota, { foreignKey: 'id_persona', as: 'mascotas' })
Mascota.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })

ProductoServicio.hasMany(IngresoProducto, {
  foreignKey: 'id_ps',
  as: 'ingresos_producto',
})
IngresoProducto.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})
Proveedor.hasMany(IngresoProducto, {
  foreignKey: 'id_proveedor',
  as: 'ingresos_producto',
})
IngresoProducto.belongsTo(Proveedor, {
  foreignKey: 'id_proveedor',
  as: 'proveedor',
})

ProductoServicio.hasMany(Promocion, { foreignKey: 'id_ps', as: 'promociones' })
Promocion.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})

Persona.hasOne(Carrito, { foreignKey: 'id_persona', as: 'carrito' })
Carrito.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })

Carrito.hasMany(ProductoCarrito, {
  foreignKey: 'id_carrito',
  as: 'productos_carrito',
})
ProductoCarrito.belongsTo(Carrito, { foreignKey: 'id_carrito', as: 'carrito' })
ProductoCarrito.belongsTo(ProductoServicio, {
  foreignKey: 'id_ps',
  as: 'producto_servicio',
})

Factura.hasMany(DetalleFactura, {
  foreignKey: 'id_factura',
  as: 'detalles_factura',
})
DetalleFactura.belongsTo(Factura, { foreignKey: 'id_factura', as: 'factura' })

//ver el de pagos
// Persona.hasOne(Carrito, { foreignKey: 'id_persona', as: 'carrito' })
// Carrito.belongsTo(Persona, { foreignKey: 'id_persona', as: 'persona' })

Pago.hasOne(Factura, { foreignKey: 'id_pago', as: 'factura' })
Factura.belongsTo(Pago, { foreignKey: 'id_pago', as: 'pago' })

Carrito.hasMany(Pago, {
  foreignKey: 'id_carrito',
  as: 'pago',
})
Pago.belongsTo(Carrito, {
  foreignKey: 'id_carrito',
  as: 'carrito',
})

Pregunta.hasMany(Respuesta, { foreignKey: 'id_preguntas', as: 'respuesta' })
Respuesta.belongsTo(Pregunta, { foreignKey: 'id_preguntas', as: 'pregunta' })

// Sincronizar base de datos (sin forzar recreación de tablas)
sequelize
  .sync({ force: false })
  .then(() =>
    console.log(
      'Base de datos sincronizada correctamente: http://localhost:4000/graphql',
    ),
  )
  .catch(err => console.error('Error al sincronizar la base de datos:', err))

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
  Pregunta,
  Respuesta,
  Pago,
  Factura,
  DetalleFactura,
}
