// solo query y mutation de promocion

const {
    getPromocion,
    createPromocion,
    cancelPromocion,
    updatePromocion,
  } = require('../controllers/promocion.controller')
  
  ///aca llama al controller y retorna
  
  const promocionResolvers = {
    Query: {
      promociones: async () => await getPromocion(),
    },
    Mutation: {
      createPromocion: async (_, args) => await createPromocion(args),
      cancelPromocion: async (_, id_promocion) => await cancelPromocion(id_promocion),
      updatePromocion: async (_, args) => await updatePromocion(args),
    },
  }

  module.exports = promocionResolvers