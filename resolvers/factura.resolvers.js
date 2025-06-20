const {
  getFactura,
  createFactura,
  getAllFacturaWithDetails,
  getFacturaWithDetailsById,
} = require('../controllers/factura.controller')

const facturaResolvers = {
  Query: {
    facturas: async () => await getFactura(),
    getAllFacturaWithDetails: async () => await getAllFacturaWithDetails(),
    getFacturaWithDetailsById: async (_, id_factura) =>
      await getFacturaWithDetailsById(id_factura),
  },
  Mutation: {
    createFactura: async (_, args) => await createFactura(args),
  },
}

module.exports = facturaResolvers
