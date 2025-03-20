// solo query y mutation de persona

const {
    getFactura,
    createFactura,
  } = require('../controllers/factura.controller')
  
  ///aca llama al controller y retorna
  
  const facturaResolvers = {
    Query: {
      facturas: async () => await getFactura(),
    },
    Mutation: {
      createFactura: async (_, args) => await createFactura(args),
      
    },
  }
  
  module.exports = facturaResolvers