const carritoResolvers = require('./carrito.resolvers')
const detalleFacturaResolvers = require('./detalleFactura.resolvers')
const personaResolvers = require('./persona.resolvers')
const mascotaResolvers = require('./mascota.resolvers');
const pagoResolvers = require('./pago.resolvers');
const productoCarritoResolvers = require('./productoCarrito.resolvers');
const ingresoProductoResolvers = require('./ingresoProducto.resolvers');
const productoServicioResolvers = require('./productoServicio.resolvers')
const respuestaResolvers = require('./respuesta.resolvers')
const proveedorResolvers = require('./proveedor.resolvers')
const promocionResolvers = require('./promocion.resolvers')
const preguntaResolvers = require('./pregunta.resolvers')
const facturaResolvers = require('./factura.resolvers')

const resolvers = {
  Query: {
    ...personaResolvers.Query,
    ...mascotaResolvers.Query,
    ...pagoResolvers.Query,
    ...productoCarritoResolvers.Query,
    ...ingresoProductoResolvers.Query,
    ...productoServicioResolvers.Query,
    ...carritoResolvers.Query,
    ...respuestaResolvers.Query,
    ...detalleFacturaResolvers.Query,
    ...proveedorResolvers.Query,
    ...promocionResolvers.Query,
    ...preguntaResolvers.Query,
    ...facturaResolvers.Query,
  },

  Mutation: {
    ...personaResolvers.Mutation,
    ...mascotaResolvers.Mutation,
    ...pagoResolvers.Mutation,
    ...productoCarritoResolvers.Mutation,
    ...ingresoProductoResolvers.Mutation,
    ...productoServicioResolvers.Mutation,
    ...carritoResolvers.Mutation,
    ...respuestaResolvers.Mutation,
    ...detalleFacturaResolvers.Mutation,
    ...proveedorResolvers.Mutation,
    ...promocionResolvers.Mutation,
    ...preguntaResolvers.Mutation,
    ...facturaResolvers.Mutation,
  },
}

module.exports = { resolvers }
