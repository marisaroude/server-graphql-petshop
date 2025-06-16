const { Client } = require('pg')
const {
  getFacturaWithDetailsById,
} = require('../controllers/factura.controller')
const { getPersonById } = require('../controllers/persona.controller')
const { sendEmail } = require('./nodemailer.handler')
const { ProductoServicio } = require('../models')

const pgClient = new Client({
  connectionString: process.env.DATABASE_URL,
})

const initClient = async () => {
  //conectar la base de datos para poder estar escuchando el canal q avisa cuando se crea una factura
  await pgClient.connect()
  await pgClient.query('LISTEN new_factura')
  await listenNewFacturaAndSendEmail()
}

const listenNewFacturaAndSendEmail = async () => {
  pgClient.on('notification', async msg => {
    if (msg.channel === 'new_factura') {
      const facturaId = msg.payload
      console.log(`New Factura inserted, id: ${facturaId}`)
      try {
        const facturaWithDetails = await getFacturaWithDetailsById({
          id_factura: facturaId,
        })

        if (facturaWithDetails.pago.id_carrito) {
          const customer = await getPersonById({
            id_persona: facturaWithDetails.pago.id_carrito,
          })
          const productos = await Promise.all(
            facturaWithDetails.detalles.map(async item => {
              const producto = await ProductoServicio.findOne({
                where: { id_ps: item.id_ps },
              })
              return producto
            }),
          )

          const facturaWithProducts = {
            ...facturaWithDetails,
            productos: productos,
          }

          if (customer) {
            await sendEmail(customer, facturaWithProducts)
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
}
module.exports = { initClient }
