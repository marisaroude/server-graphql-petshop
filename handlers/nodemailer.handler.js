const nodemailer = require('nodemailer')
const path = require('path')
const fs = require('fs')

const { EMAIL_USER, PASS_USER } = process.env
const logoPath = path.join(__dirname, '../public/LOGO-puppis.png')
const logoPuppis = fs.readFileSync(logoPath)

const filePath = path.join(__dirname, '../public/ILLUSTRATION-dog.png')
const illustration = fs.readFileSync(filePath)
async function sendEmail(customer, factura) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: PASS_USER,
    },
  })

  const mailOptions = {
    from: EMAIL_USER,
    to: customer.correo_electronico,
    subject: 'Detalle de Factura',
    html: buildEmail(factura, customer),
    attachments: [
      {
        filename: 'LOGO-puppis.png',
        content: logoPuppis,
        cid: 'logo',
      },
      {
        filename: 'ILLUSTRATION-dog.png',
        content: illustration,
        cid: 'illustration',
      },
    ],
  }

  try {
    const response = await transporter.sendMail(mailOptions)
    console.log('Correo enviado', response)
  } catch (error) {
    console.error('Error al enviar correo:', error)
  }
}

const buildEmail = (factura, customer) => {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Factura de compra</title>
  </head>
  <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <!-- Header Banner -->
      <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
          <tr>
              <td style="padding: 20px; background-color: #ffffff; text-align: center;">
                  <table width="100%">
                      <tr>
                          <td style="text-align: left;">
                              <img src="cid:logo" alt="Logo" style="height: 80px;" />
                          </td>
                          <td style="text-align: right;">
                              <img src="cid:illustration" alt="Illustration Dog" style="height: 140px;" />
                          </td>
                      </tr>
                  </table>
              </td>
          </tr>
  
          <!-- Success Message -->
          <tr>
              <td style="background-color: #ffffff; padding: 20px; text-align: center;">
                  <h1 style="color: #333;">Hola ${customer.nombre}, muchas gracias por tu compra!</h1>
                  <p style="color: #555; font-size: 18px;">Hemos generado tu factura con ID: <strong>${factura.id_factura}</strong></p>
                  <p style="color: #555; font-size: 18px;">Monto total de la factura: <strong>$${factura.total}</strong></p>
              </td>
          </tr>
  
          <!-- Footer -->
          <tr>
              <td style="background-color: #333; padding: 10px; text-align: center;">
                  <p style="color: #fff; font-size: 14px;">Puppis - Tu tienda de mascotas favorita</p>
              </td>
          </tr>
      </table>
  </body>
  </html>
  `
}

module.exports = { sendEmail }
