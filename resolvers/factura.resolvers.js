const {
  getFactura,
  createFactura,
} = require('../controllers/factura.controller')

const facturaResolvers = {
  Query: {
    facturas: async () => await getFactura(),
  },
  Mutation: {
    createFactura: async (_, args) => await createFactura(args),
  },
}

module.exports = facturaResolvers
