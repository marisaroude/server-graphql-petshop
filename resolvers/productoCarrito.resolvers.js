const {
  getProductosCarrito,
  createProductoCarrito,
  deleteProductosCarrito,
  getProductosCarritoById,
  updateProductoCarrito,
} = require('../controllers/productoCarrito.controller')

const productoCarritoResolvers = {
  Query: {
    productosCarritos: async () => await getProductosCarrito(),
    productosCarritosById: async (_, args) =>
      await getProductosCarritoById(args),
  },
  Mutation: {
    createProductoCarrito: async (_, args) => await createProductoCarrito(args),
    deleteProductosCarrito: async (_, { id_pc }) =>
      await deleteProductosCarrito({ id_pc }),
    updateProductoCarrito: async (_, args) => await updateProductoCarrito(args),
  },
}

module.exports = productoCarritoResolvers
