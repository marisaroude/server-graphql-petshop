const { ProductoServicio } = require('../models')

async function getProductosServicios() {
  return await ProductoServicio.findAll()
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

module.exports = {
  getProductosServicios,
  createProductoServicio,
  cancelProductoServicios,
}
