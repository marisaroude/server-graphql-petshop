const { Pago, Factura, DetalleFactura, ProductoServicio } = require('../models')

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

async function getPagosByPersonaId({ id_persona }) {
  const pagos = await Pago.findAll({
    where: { id_carrito: id_persona },
    include: [
      {
        model: Factura,
        as: 'factura',
        include: {
          model: DetalleFactura,
          as: 'detalles_factura',
          include: [
            {
              model: ProductoServicio,
              as: 'producto_servicio',
            },
          ],
        },
      },
    ],
  })

  return pagos.map(pago => {
    const { factura, ...restPago } = pago.toJSON ? pago.toJSON() : pago

    // factura puede ser null o undefined, chequeamos eso
    const detalles =
      factura?.detalles_factura?.map(detalle => {
        return {
          ...detalle,
          producto_servicio: detalle.producto_servicio || null,
        }
      }) || []

    return {
      pago: restPago,
      factura: factura
        ? {
            ...factura,
            detalles_factura: detalles,
          }
        : null,
    }
  })
}

module.exports = {
  getPagos,
  createPago,
  checkIfPaymentExists,
  getPagoById,
  getPagosByPersonaId,
}
