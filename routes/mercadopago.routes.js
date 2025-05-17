const express = require('express')
const {
  createPreference,
  receiveWebhook,
} = require('../handlers/mercadopago.handler')
const router = express.Router()

const path = require('path')

router.post('/create_preference', createPreference)

// Rutas de notificación y respuesta de pago
router.get('/success', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/success.html'))
})

router.get('/failure', (req, res) => {
  console.log('Pago fallido')
  res.send('Failure')
})

router.get('/pending', (req, res) => {
  console.log('Pago pendiente')
  res.send('Pending')
})

// Ruta para el webhook de MercadoPago
router.post('/webhook', receiveWebhook)

module.exports = router
