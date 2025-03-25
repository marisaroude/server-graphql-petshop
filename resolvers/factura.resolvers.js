// solo query y mutation de persona

const {
    getFactura,
   
  } = require('../controllers/factura.controller')
  
  ///aca llama al controller y retorna
  
  const facturaResolvers = {
    Query: {
      facturas: async () => await getFactura(),
    },
    Mutation: {
      
      
    },
  }
  
  module.exports = facturaResolvers