const { Proveedor } = require('../models')
async function getProveedor() {
  return await Proveedor.findAll()
}

async function createProveedor({ nombre, cuit, activo }) {
  try {
    if (!nombre || !cuit || !activo) {
      throw new Error('name, cuit and state are required')
    }

    const proveedor = await Proveedor.create({
      nombre,
      cuit,
      estado,
    })

    return proveedor
  } catch (error) {
    throw new Error(`Error creating the supplier: ${error.message}`)
  }
}

module.exports = { getProveedor, createProveedor }
