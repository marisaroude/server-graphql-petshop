const {
  getPagos,
  createPago,
  getPagosByPersonaId,
} = require('../controllers/pago.controller')

const pagoResolvers = {
  Query: {
    pagos: async () => await getPagos(),
    pagosByPersonaId: async (_, id_persona) =>
      await getPagosByPersonaId(id_persona),
  },
  Mutation: {
    createPago: async (_, args) => await createPago(args),
  },
}

module.exports = pagoResolvers
