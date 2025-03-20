
const { ProductoCarrito } = require('../models');

// Obtener todos los productos en el carrito
async function getProductosCarrito() {
  return await ProductoCarrito.findAll();
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
      throw new Error('Todos los campos son requeridos');
    }

    const productoCarrito = await ProductoCarrito.create({
      cantidad,
      subtotal,
      id_ps,
      id_carrito,
    });

    return productoCarrito;
  } catch (error) {
    throw new Error(`Error creando el producto en el carrito: ${error.message}`);
  }
}


// Eliminar un producto del carrito
async function deleteProductosCarrito({ id_pc }) {
  try {
    if (!id_pc) {
      throw new Error('ID del producto en el carrito es requerido');
    }

    const productoCarrito = await ProductoCarrito.findByPk(id_pc);
    if (!productoCarrito) {
      throw new Error('Producto en el carrito no encontrado');
    }

    await ProductoCarrito.destroy({
      where: { id_pc },
    });

    return { message: 'Producto eliminado del carrito correctamente' };
  } catch (error) {
    throw new Error(`Error eliminando el producto del carrito: ${error.message}`);
  }
}

module.exports = {
  getProductosCarrito,
  createProductoCarrito,
  deleteProductosCarrito,
};