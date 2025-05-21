const { ProductoCarrito } = require('../models')

// Obtener todos los productos en el carrito
async function getProductosCarrito() {
  return await ProductoCarrito.findAll()
}

async function getProductosCarritoById({ id_carrito }) {
  if (!id_carrito) {
    throw new Error('ID is required')
  }

  const product = await ProductoCarrito.findAll({
    where: {
      id_carrito: id_carrito,
    },
  })

  if (!product) {
    throw new Error(`Product/Service with id ${id_ps} not found`)
  }

  return product
}

// Crear un nuevo producto en el carrito
async function createProductoCarrito({
  cantidad,
  subtotal,
  id_ps,
  id_carrito,
}) {
  try {
    // Validar campos requeridos
    if (!cantidad || !subtotal || !id_ps || !id_carrito) {
      throw new Error('Todos los campos son requeridos')
    }

    // Verificar si el producto ya existe en el carrito del usuario
    const existingProduct = await ProductoCarrito.findOne({
      where: {
        id_ps,
        id_carrito,
      },
    })

    if (existingProduct) {
      // Actualizar la cantidad y el subtotal si ya existe el producto
      const updatedCantidad =
        parseInt(existingProduct.cantidad) + parseInt(cantidad)
      const updatedSubtotal =
        parseInt(existingProduct.subtotal) + parseInt(subtotal)

      await existingProduct.update({
        cantidad: updatedCantidad,
        subtotal: updatedSubtotal,
      })

      return existingProduct
    }

    // Crear el producto si no existe
    const productoCarrito = await ProductoCarrito.create({
      cantidad,
      subtotal,
      id_ps,
      id_carrito,
    })
    return productoCarrito
  } catch (error) {
    throw new Error(`Error creando el producto en el carrito: ${error.message}`)
  }
}

// Eliminar un producto del carrito
async function deleteProductosCarrito({ id_pc }) {
  try {
    if (!id_pc) {
      throw new Error('ID del producto en el carrito es requerido')
    }

    const productoCarrito = await ProductoCarrito.findByPk(id_pc)
    if (!productoCarrito) {
      throw new Error('Producto en el carrito no encontrado')
    }

    await ProductoCarrito.destroy({
      where: { id_pc },
    })

    return { message: 'Producto eliminado del carrito correctamente' }
  } catch (error) {
    throw new Error(
      `Error eliminando el producto del carrito: ${error.message}`,
    )
  }
}

module.exports = {
  getProductosCarrito,
  getProductosCarritoById,
  createProductoCarrito,
  deleteProductosCarrito,
}
