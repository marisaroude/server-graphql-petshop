const { Pago } = require('../models')

// Obtener todos los pagos
async function getPagos() {
  return await Pago.findAll()
}

// Crear un nuevo pago
async function createPago({ id_mercadopago, id_carrito, fecha, monto }) {
  try {
    if (!id_mercadopago || !id_carrito || !fecha || !monto) {
      throw new Error('Todos los campos son requeridos')
    }

    const pago = await Pago.create({
      id_mercadopago,
      id_carrito,
      fecha,
      monto,
    })

    return pago
  } catch (error) {
    throw new Error(`Error creando el pago: ${error.message}`)
  }
}

const checkIfPaymentExists = async paymentId => {
  try {
    const payment = await Pago.findOne({ where: { id_mercadopago: paymentId } })
    return payment !== null
  } catch (error) {
    console.error('Error al verificar el pago:', error)
    return false
  }
}

async function getPagoById({ id_pago }) {
  if (!id_pago) {
    throw new Error('ID pago is required')
  }

  const pago = await Pago.findOne({
    where: { id_pago: id_pago },
  })

  if (!pago) {
    throw new Error(`Pago with id_pago ${id_pago} not found`)
  }

  return pago
}

module.exports = {
  getPagos,
  createPago,
  checkIfPaymentExists,
  getPagoById,
}
