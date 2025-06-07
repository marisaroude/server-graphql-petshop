const { IngresoProducto, ProductoServicio } = require('../models')

// Obtener todos los ingresos de productos
async function getIngresosProductos() {
  return await IngresoProducto.findAll()
}

// Crear un nuevo ingreso de producto
async function createIngresoProducto({
  id_proveedor,
  subtotal,
  cantidad,
  id_ps,
}) {
  try {
    // Validar campos requeridos
    if (!id_proveedor || !subtotal || !cantidad || !id_ps) {
      throw new Error('Todos los campos son requeridos')
    }

    const ingresoProducto = await IngresoProducto.create({
      id_proveedor,
      subtotal,
      cantidad,
      id_ps,
    })

    const producto_servicio = await ProductoServicio.findByPk(id_ps)
    if (!producto_servicio) {
      throw new Error('Producto no encontrado')
    }

    // Actualizar el stock sumando la cantidad
    const nuevoStock = parseInt(producto_servicio.stock) + parseInt(cantidad)
    await ProductoServicio.update({ stock: nuevoStock }, { where: { id_ps } })

    const updatedProduct = await ProductoServicio.findByPk(id_ps)

    return {
      ingreso: ingresoProducto,
      updatedProduct,
    }
  } catch (error) {
    throw new Error(`Error creando el ingreso de producto: ${error.message}`)
  }
}

module.exports = {
  getIngresosProductos,
  createIngresoProducto,
}
