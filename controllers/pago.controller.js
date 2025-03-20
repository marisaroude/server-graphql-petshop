const { Pago } = require('../models');

// Obtener todos los pagos
async function getPagos() {
  return await Pago.findAll();
}

// Crear un nuevo pago
async function createPago({
  id_carrito,
  fecha,
  monto,
}) {
  try {
    // Validar campos requeridos
    if (!id_carrito || !fecha || !monto) {
      throw new Error('Todos los campos son requeridos');
    }

    const pago = await Pago.create({
      id_carrito,
      fecha,
      monto,
    });

    return pago;
  } catch (error) {
    throw new Error(`Error creando el pago: ${error.message}`);
  }
}





module.exports = {
  getPagos,
  createPago,
};