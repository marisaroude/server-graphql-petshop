const {
  getPromocion,
  createPromocion,
  cancelPromocion,
  updatePromocion,
  getPromocionById,
} = require('../controllers/promocion.controller')

const promocionResolvers = {
  Query: {
    promociones: async () => await getPromocion(),
    promocionById: async (_, id_promocion) =>
      await getPromocionById(id_promocion),
  },
  Mutation: {
    createPromocion: async (_, args) => await createPromocion(args),
    cancelPromocion: async (_, id_promocion) =>
      await cancelPromocion(id_promocion),
    updatePromocion: async (_, args) => await updatePromocion(args),
  },
}

module.exports = promocionResolvers
