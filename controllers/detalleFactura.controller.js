const { DetalleFactura } = require('../models')

async function getDetalleFacturas() {
  return await DetalleFactura.findAll()
}

module.exports = { getDetalleFacturas }
