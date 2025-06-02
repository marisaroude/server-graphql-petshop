const {
  getFactura,
  createFactura,
  getAllFacturaWithDetails,
} = require('../controllers/factura.controller')

const facturaResolvers = {
  Query: {
    facturas: async () => await getFactura(),
    getAllFacturaWithDetails: async () => await getAllFacturaWithDetails(),
  },
  Mutation: {
    createFactura: async (_, args) => await createFactura(args),
  },
}

module.exports = facturaResolvers
