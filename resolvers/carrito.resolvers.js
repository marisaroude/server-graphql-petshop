const {
  getCarritos,
  createCarrito,
} = require('../controllers/carrito.controller')

const carritoResolvers = {
  Query: {
    carritos: async () => await getCarritos(),
  },
  Mutation: {
    createCarrito: async (_, args) => await createCarrito(args),
  },
}

module.exports = carritoResolvers
