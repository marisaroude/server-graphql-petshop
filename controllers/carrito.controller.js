const { Carrito } = require('../models')

async function getCarritos() {
  return await Carrito.findAll()
}

async function createCarrito({ id_persona, fecha, total }) {
  console.log({ id_persona, fecha, total })
  if (!id_persona || !fecha || total == null) {
    throw new Error('ID person, date and total are required')
  }

  const carrito = await Carrito.create({
    id_persona,
    fecha,
    total,
  })

  return carrito
}
module.exports = { getCarritos, createCarrito }
