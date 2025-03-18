const {
  getDetalleFacturas,
} = require('../controllers/detalleFactura.controller')

const detalleFacturaResolvers = {
  Query: {
    detallefacturas: async () => await getDetalleFacturas(),
  },
  Mutation: {
    //
  },
}

module.exports = detalleFacturaResolvers
