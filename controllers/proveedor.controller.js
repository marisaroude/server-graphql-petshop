//aca va la logica de negocio
// validaciones etc
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { Proveedor } = require('../models')

//lamar los modelos aca en  los controllers

// funciones
//getProveedor

async function getProveedor() {
  return await Proveedor.findAll()
}

async function createProveedor({
  nombre,
  cuit,
  activo,
}) {
  try {
    if (
      !nombre ||
      !cuit ||
      !activo 
    ) {
      throw new Error(
        'name, cuit and state are required',
      )
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


module.exports = { getPersonas, createPersona}
