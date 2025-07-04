const { Factura, Pago, DetalleFactura } = require('../models')

async function getFactura() {
  return await Factura.findAll()
}

async function createFactura({ id_factura, id_pago, fecha, total }) {
  try {
    if (!id_factura || !id_pago || !fecha || !total) {
      throw new Error('bill, pay, date and total are required')
    }

    const factura = await Factura.create({
      id_factura,
      id_pago,
      fecha,
      total,
    })

    return factura
  } catch (error) {
    throw new Error(`Error creating the bill: ${error.message}`)
  }
}

async function getFacturaById({ id_factura }) {
  if (!id_factura) {
    throw new Error('ID factura is required')
  }

  const factura = await Factura.findOne({
    where: { id_factura: id_factura },
  })

  if (!factura) {
    throw new Error(`Factura with id_factura ${id_factura} not found`)
  }

  return factura
}

async function getAllFacturaWithDetails() {
  const facturas = await Factura.findAll({
    include: [
      { model: Pago, as: 'pago' },
      {
        model: DetalleFactura,
        as: 'detalles_factura',
      },
    ],
  })

  return facturas.map(factura => ({
    factura,
    pago: factura.pago,
    detalles: factura.detalles_factura.map(df => ({
      ...df.toJSON(),
      subtotal: df.cantidad * parseFloat(df.precio),
    })),
  }))
}

async function getFacturaWithDetailsById({ id_factura }) {
  const factura = await Factura.findOne({
    where: { id_factura: id_factura },
    include: [
      { model: Pago, as: 'pago' },
      {
        model: DetalleFactura,
        as: 'detalles_factura',
      },
    ],
  })

  return {
    factura,
    pago: factura.pago,
    detalles: factura.detalles_factura.map(df => ({
      ...df.toJSON(),
      subtotal: df.cantidad * parseFloat(df.precio),
    })),
  }
}
module.exports = {
  getFactura,
  createFactura,
  getFacturaById,
  getAllFacturaWithDetails,
  getFacturaWithDetailsById,
}
