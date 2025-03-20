const { IngresoProducto } = require('../models');

// Obtener todos los ingresos de productos
async function getIngresosProductos() {
  return await IngresoProducto.findAll();
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
      throw new Error('Todos los campos son requeridos');
    }

    const ingresoProducto = await IngresoProducto.create({
      id_proveedor,
      subtotal,
      cantidad,
      id_ps,
    });

    return ingresoProducto;
  } catch (error) {
    throw new Error(`Error creando el ingreso de producto: ${error.message}`);
  }
}

module.exports = {
  getIngresosProductos,
  createIngresoProducto
};