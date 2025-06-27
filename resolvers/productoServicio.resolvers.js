const {
  getProductosServicios,
  createProductoServicio,
  cancelProductoServicios,
  updateProductoServicio,
  getProductoServicioById,
  getAllSalesQuantityProduct,
  getInformationIngresosByProductId,
} = require('../controllers/productoServicio.controller')

const productoServicioResolvers = {
  Query: {
    productosServicios: async () => await getProductosServicios(),
    productoServicioById: async (_, id_ps) =>
      await getProductoServicioById(id_ps),
    allSalesQuantityProduct: async () => await getAllSalesQuantityProduct(),
    informationIngresosByProductId: async (_, id_ps) =>
      await getInformationIngresosByProductId(id_ps),
  },
  Mutation: {
    createProductoServicio: async (_, args) =>
      await createProductoServicio(args),
    cancelProductoServicios: async (_, id_ps) =>
      await cancelProductoServicios(id_ps),
    updateProductoServicio: async (_, args) =>
      await updateProductoServicio(args),
  },
}

module.exports = productoServicioResolvers
