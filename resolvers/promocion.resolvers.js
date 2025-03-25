const {
  getPromocion,
  createPromocion,
  cancelPromocion,
  updatePromocion,
} = require('../controllers/promocion.controller')

const promocionResolvers = {
  Query: {
    promociones: async () => await getPromocion(),
  },
  Mutation: {
    createPromocion: async (_, args) => await createPromocion(args),
    cancelPromocion: async (_, id_promocion) =>
      await cancelPromocion(id_promocion),
    updatePromocion: async (_, args) => await updatePromocion(args),
  },
}

module.exports = promocionResolvers
