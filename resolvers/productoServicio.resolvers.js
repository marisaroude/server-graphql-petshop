const {
  getProductosServicios,
  createProductoServicio,
  cancelProductoServicios,
} = require('../controllers/productoServicio.controller')

const productoServicioResolvers = {
  Query: {
    productosServicios: async () => await getProductosServicios(),
  },
  Mutation: {
    createProductoServicio: async (_, args) =>
      await createProductoServicio(args),
    cancelProductoServicios: async (_, id_ps) =>
      await cancelProductoServicios(id_ps),
  },
}

module.exports = productoServicioResolvers
