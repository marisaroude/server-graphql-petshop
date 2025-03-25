const {
  getProveedor,
  createProveedor,
} = require('../controllers/proveedor.controller')

const proveedorResolvers = {
  Query: {
    proveedores: async () => await getProveedor(),
  },
  Mutation: {
    createProveedor: async (_, args) => await createProveedor(args),
  },
}

module.exports = proveedorResolvers
