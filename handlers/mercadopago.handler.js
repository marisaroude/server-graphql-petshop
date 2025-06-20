const { MercadoPagoConfig, Preference, Payment } = require('mercadopago')
const { ProductoServicio } = require('../models')
const {
  createPago,
  checkIfPaymentExists,
} = require('../controllers/pago.controller')
const { formatDate } = require('./date.handler')

const { ACCESS_TOKEN_MERCADO_PAGO, NGROK_TUNNEL } = process.env

const client = new MercadoPagoConfig({
  accessToken: ACCESS_TOKEN_MERCADO_PAGO,
  options: { timeout: 5000 },
})

const formatItems = async items => {
  try {
    const formattedItems = await Promise.all(
      items.map(async item => {
        const producto = await ProductoServicio.findOne({
          where: { id_ps: item.id_ps },
        })

        if (!producto) {
          throw new Error(`Producto con id ${item.id_ps} no encontrado.`)
        }

        return {
          title: producto.nombre,
          id: item.id_carrito,
          description: producto.descripcion,
          unit_price: Number(item.subtotal) / Number(item.cantidad), // precio unitario, mercado pago lo multiplica x la cantidad
          quantity: item.cantidad,
        }
      }),
    )

    return formattedItems
  } catch (error) {
    console.error('Error formateando los items:', error)
    throw new Error('No se pudieron procesar los items')
  }
}

const createPreference = async (req, res) => {
  try {
    const { items } = req.body
    const formattedItems = await formatItems(items)

    const body = {
      items: formattedItems,
      back_urls: {
        success: `${NGROK_TUNNEL}/api/mercadopago/success`,
        failure: `${NGROK_TUNNEL}/api/mercadopago/failure`,
        pending: `${NGROK_TUNNEL}/api/mercadopago/pending`,
      },
      auto_return: 'approved',
      notification_url: `${NGROK_TUNNEL}/api/mercadopago/webhook`,
    }
    const preference = new Preference(client)

    const response = await preference.create({ body })

    res.status(200).json({ id: response.id })
  } catch (error) {
    console.error('Error al crear la preferencia:', error)
    res.status(500).json({ error: error.message })
  }
}

const receiveWebhook = async (req, res) => {
  const payment = req.query
  res.status(200).json({ message: 'Webhook recibido correctamente' })

  try {
    if (payment.type === 'payment') {
      const paymentId = payment['data.id']
      const existingPayment = await checkIfPaymentExists(paymentId)

      if (existingPayment) {
        console.log('Pago ya registrado:', paymentId)
        return res.status(200).json({ message: 'Pago ya procesado' })
      }

      const initPayment = new Payment(client)
      const data = await initPayment.get({ id: paymentId })
      console.log('DATA FROM WEBHOOK', data)
      if (data) {
        const date = formatDate(data.date_approved)
        const id_carrito = data.additional_info.items[0].id
        const response = await createPago({
          id_mercadopago: paymentId,
          id_carrito: id_carrito,
          monto: data.transaction_amount,
          fecha: date,
        })
        console.log('RESPONSE CREATE PAGO', response)
      }
    }
    res.status(204)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: error.message })
  }
}

module.exports = { createPreference, formatItems, receiveWebhook }
