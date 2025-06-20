
const {
  getIngresosProductos,
  createIngresoProducto,
} = require('../controllers/ingresoProducto.controller');


const ingresoProductoResolvers = {
  Query: {
    ingresosProductos: async () => await getIngresosProductos(),
  },
  Mutation: {
    createIngresoProducto: async (_, args) => await createIngresoProducto(args),
  },
};

module.exports = ingresoProductoResolvers;