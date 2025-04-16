const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined

const { ProductoServicio } = require('../models')

async function getProductosServicios() {
  return await ProductoServicio.findAll()
}

async function getProductoServicioById({ id_ps }) {
  if (!id_ps) {
    throw new Error('ID is required')
  }

  const product = await ProductoServicio.findByPk(id_ps)

  if (!product) {
    throw new Error(`Product/Service with id ${id_ps} not found`)
  }

  return product
}

async function createProductoServicio({
  nombre,
  precio,
  stock,
  descripcion,
  categoria,
  activo,
}) {
  try {
    //what happen with activo?
    if (!nombre || !precio || !stock || !categoria) {
      throw new Error('Name, pricem stock and category are required')
    }

    const productoServicio = await ProductoServicio.create({
      nombre,
      precio,
      stock,
      descripcion,
      categoria,
      activo,
    })
    return productoServicio
  } catch (error) {
    throw new Error(`Error creating the product service: ${error.message}`)
  }
}

async function cancelProductoServicios({ id_ps }) {
  try {
    if (!id_ps) {
      throw new Error('ID is required')
    }

    const product = await ProductoServicio.findByPk(id_ps)

    if (!product) {
      throw new Error('Product not found')
    }

    await ProductoServicio.update(
      { activo: false },
      { where: { id_ps: id_ps } },
    )

    return { ...product.toJSON(), activo: false }
  } catch (error) {
    throw new Error(`Error cancelling the product service: ${error.message}`)
  }
}

//Modificar los productos o servicios
async function updateProductoServicio({ id_ps, input }) {
  try {
    console.log('{ id_ps, input }', { id_ps, input })
    if (!id_ps) {
      throw new Error('Service is required')
    }

    const producto_servicio = await ProductoServicio.findByPk(id_ps)
    if (!producto_servicio) {
      throw new Error('Service not found')
    }
    //
    // Filtrar valores undefined para evitar sobrescribir con null
    const dataToUpdate = omitBy(input, isUndefined)

    await ProductoServicio.update(dataToUpdate, {
      where: { id_ps },
    })

    return { ...producto_servicio.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the Service: ${error.message}`)
  }
}

module.exports = {
  getProductosServicios,
  getProductoServicioById,
  createProductoServicio,
  cancelProductoServicios,
  updateProductoServicio,
}
