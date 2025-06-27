const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined
const { fn, col } = require('sequelize')

const { ProductoServicio, DetalleFactura } = require('../models')

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
  image,
  fechas_servicios,
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
      image,
      fechas_servicios,
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

    console.log('dataToUpdate', dataToUpdate)
    await ProductoServicio.update(dataToUpdate, {
      where: { id_ps },
    })

    return { ...producto_servicio.toJSON(), ...dataToUpdate }
  } catch (error) {
    throw new Error(`Error updating the Service: ${error.message}`)
  }
}

async function getAllSalesQuantityProduct() {
  const ventas = await DetalleFactura.findAll({
    attributes: [
      'id_ps',
      [fn('SUM', col('cantidad')), 'cantidad_ventas'],
      [fn('SUM', col('Detallefactura.precio')), 'total_facturado'],
    ],
    include: [
      {
        model: ProductoServicio,
        as: 'producto_servicio',
        attributes: ['nombre', 'precio', 'stock'],
      },
    ],
    group: ['Detallefactura.id_ps', 'producto_servicio.id_ps'],
    order: [[fn('SUM', col('cantidad')), 'DESC']],
  })

  return ventas.map(v => ({
    id_ps: v.id_ps,
    cantidad_ventas: parseInt(v.get('cantidad_ventas')),
    total_facturado: parseFloat(v.get('total_facturado')),
    producto: {
      nombre: v.producto_servicio.nombre,
      precio: v.producto_servicio.precio,
      stock: v.producto_servicio.stock,
    },
  }))
}

module.exports = {
  getProductosServicios,
  getProductoServicioById,
  createProductoServicio,
  cancelProductoServicios,
  updateProductoServicio,
  getAllSalesQuantityProduct,
}
