// solo query y mutation de proveedor

const {
    getProveedor,
    createProveedor,
    cancelProveedor,
    updateProveedor,
  } = require('../controllers/proveedor.controller')

  const proveedorResolvers = {
    Query: {
        proveedores: async () => await getProveedor(),
    },
    Mutation:{
        createProveedor: async (_, args) => await createProveedor(args),
        cancelProveedor: async (_, id_proveedor) => await cancelProveedor(id_proveedor),
        updateProveedor: async (_, args) => await updateProveedor(args),
    },
}

module.exports = proveedorResolvers
