const personaResolvers = require('./persona.resolvers')
const mascotaResolvers = require('./mascota.resolvers');
const pagoResolvers = require('./pago.resolvers');
const productoCarritoResolvers = require('./productoCarrito.resolvers');
const ingresoProductoResolvers = require('./ingresoProducto.resolvers');

const resolvers = {
  Query: {
    ...personaResolvers.Query,
    ...mascotaResolvers.Query,
    ...pagoResolvers.Query,
    ...productoCarritoResolvers.Query,
    ...ingresoProductoResolvers.Query,
  },

  Mutation: {
    ...personaResolvers.Mutation,
    ...mascotaResolvers.Mutation,
    ...pagoResolvers.Mutation,
    ...productoCarritoResolvers.Mutation,
    ...ingresoProductoResolvers.Mutation,
  },
}

module.exports = { resolvers }
