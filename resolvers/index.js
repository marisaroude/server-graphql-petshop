const carritoResolvers = require('./carrito.resolvers')
const detalleFacturaResolvers = require('./detalleFactura.resolvers')
const personaResolvers = require('./persona.resolvers')
const productoServicioResolvers = require('./productoServicio.resolvers')
const respuestaResolvers = require('./respuesta.resolvers')

const resolvers = {
  Query: {
    ...personaResolvers.Query,
    ...productoServicioResolvers.Query,
    ...carritoResolvers.Query,
    ...respuestaResolvers.Query,
    ...detalleFacturaResolvers.Query,
  },
  Mutation: {
    ...personaResolvers.Mutation,
    ...productoServicioResolvers.Mutation,
    ...carritoResolvers.Mutation,
    ...respuestaResolvers.Mutation,
    ...detalleFacturaResolvers.Mutation,
  },
}

module.exports = { resolvers }
