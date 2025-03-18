const carritoResolvers = require('./carrito.resolvers')
const detalleFacturaResolvers = require('./detalleFactura.resolvers')
const personaResolvers = require('./persona.resolvers')
const productoServicioResolvers = require('./productoServicio.resolvers')
const respuestaResolvers = require('./respuesta.resolvers')
const proveedorResolvers = require('./proveedor.resolvers')
const promocionResolvers = require('./promocion.resolvers')
const preguntaResolvers = require('./pregunta.resolvers')
const facturaResolvers = require('./factura.resolvers')

const resolvers = {
  Query: {
    ...personaResolvers.Query,
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
