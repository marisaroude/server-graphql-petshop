const { Client } = require('pg')
const { getPagoById } = require('../controllers/pago.controller')
const { getFacturaById } = require('../controllers/factura.controller')
const { getPersonById } = require('../controllers/persona.controller')
const { sendEmail } = require('./nodemailer.handler')

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
        const factura = await getFacturaById({ id_factura: facturaId })

        if (factura.id_pago) {
          const pago = await getPagoById({ id_pago: factura.id_pago })

          if (pago.id_carrito) {
            const customer = await getPersonById({
              id_persona: pago.id_carrito,
            })
            if (customer) {
              await sendEmail(customer, factura)
            }
          }
        }
      } catch (error) {
        console.error(error)
      }
    }
  })
}
module.exports = { initClient }
