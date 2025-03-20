const {
    getPagos,
    createPago,
  } = require('../controllers/pago.controller');
  
  const pagoResolvers = {
    Query: {
      pagos: async () => await getPagos(),
    },
    Mutation: {
      createPago: async (_, args) => await createPago(args),
    },
  };
  
  module.exports = pagoResolvers;