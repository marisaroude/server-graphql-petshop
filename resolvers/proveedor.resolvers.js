const {
  getProveedor,
  createProveedor,
  updateProveedor,
  getProveedorById,
} = require('../controllers/proveedor.controller')

const proveedorResolvers = {
  Query: {
    proveedores: async () => await getProveedor(),
    proveedorById: async (_, id_proveedor) =>
      await getProveedorById(id_proveedor),
  },
  Mutation: {
    createProveedor: async (_, args) => await createProveedor(args),
    updateProveedor: async (_, args) => await updateProveedor(args),
  },
}

module.exports = proveedorResolvers
