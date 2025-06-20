const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined
const { Proveedor } = require('../models')
async function getProveedor() {
  return await Proveedor.findAll()
}

async function createProveedor({ nombre, cuit, activo }) {
  try {
    if (!nombre || !cuit || !activo) {
      throw new Error('name, cuit and active are required')
    }

    const proveedor = await Proveedor.create({
      nombre,
      cuit,
      activo,
    })

    return proveedor
  } catch (error) {
    throw new Error(`Error creating the supplier: ${error.message}`)
  }
}

async function getProveedorById({ id_proveedor }) {
  if (!id_proveedor) {
    throw new Error('ID proveedor is required')
  }

  const proveedor = await Proveedor.findOne({
    where: { id_proveedor: id_proveedor },
  })

  if (!proveedor) {
    throw new Error(`Proveedor with id_proveedor ${id_proveedor} not found`)
  }

  return proveedor
}

async function updateProveedor({ id_proveedor, input }) {
  try {
    if (!id_proveedor) {
      throw new Error('ID proveedor is required')
    }

    const proveedor = await Proveedor.findByPk(id_proveedor)
    if (!proveedor) {
      throw new Error('Proveedor not found')
    }
    //
    // Filtrar valores undefined para evitar sobrescribir con null
    const dataToUpdate = omitBy(input, isUndefined)

    await Proveedor.update(dataToUpdate, {
      where: { id_proveedor },
    })

    return { ...proveedor.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the proveedor: ${error.message}`)
  }
}

module.exports = {
  getProveedor,
  createProveedor,
  getProveedorById,
  updateProveedor,
}
