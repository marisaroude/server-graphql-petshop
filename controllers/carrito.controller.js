const { Carrito } = require('../models')

async function getCarritos() {
  return await Carrito.findAll()
}

async function createCarrito({ id_persona, fecha }) {
  if (!id_persona || !fecha) {
    throw new Error('ID person, date and total are required')
  }

  const carrito = await Carrito.create({
    id_persona,
    fecha,
  })

  return carrito
}
module.exports = { getCarritos, createCarrito }
