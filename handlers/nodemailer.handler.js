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
  <html lang="es">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width,initial-scale=1">
      <title>Factura de compra</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          color: #555;
        }
        table {
          width: 100%;
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          padding: 20px;
          border: 1px solid #dddddd;
        }
        h1 {
          color: #ff6f61;
          margin-bottom: 20px;
          font-size: 24px;
        }
        p {
          color: #555;
          font-size: 16px;
        }
        th, td {
          padding: 12px;
          border-bottom: 1px solid #dddddd;
          text-align: left;
        }
        th {
          background: #ff6f61;
          color: #ffffff;
        }
        .total {
          font-size: 18px;
          font-weight: bold;
        }
        .footer {
          background: #ff6f61;
          color: #ffffff;
          padding: 20px;
          text-align: center;
          font-size: 14px;
        }
      </style>
  </head>
  <body>
      <!-- Encabezado -->
      <table>
        <tr>
          <td style="text-align: left">
            <img src="cid:logo" alt="Logo Puppis" style="height: 80px;" /><br>
            <h1>Factura de tu compra</h1>
          </td>
          <td style="text-align: right">
            <img src="cid:illustration" alt="Ilustracion de perrito" style="height: 140px;" /><br>
          </td>
        </tr>
      </table>

      <!-- Detalles del comprador -->
      <table>
        <tr><th>Comprador</th></tr>
        <tr>
          <td>Nombre: ${customer.nombre} ${customer.apellido}</td>
        </tr>
        <tr>
          <td>DNI: ${customer.dni}</td>
        </tr>
        <tr>
          <td>Teléfono: ${customer.telefono}</td>
        </tr>
        <tr>
          <td>Correo electrónico: ${customer.correo_electronico}</td>
        </tr>
        <tr>
          <td>Domicilio: ${customer.domicilio}</td>
        </tr>
      </table>

      <!-- Detalles de la factura -->
      <table>
        <tr><th>Productos o Servicios</th></tr>
        ${factura.detalles
          .map(
            item => `
          <tr>
            <td>ID Producto/Servicio: ${item.id_ps}</td>
            <td>Cantidad: ${item.cantidad}</td>
            <td>Valor Unitario: $${item.precio}</td>
            <td>Fecha del servicio: ${
              item.fecha_servicio ? item.fecha_servicio : '-'
            }</td>
          </tr>`,
          )
          .join('')}
      </table>

      <!-- Resumen de pagos -->
      <table>
        <tr><th>Pago</th></tr>
        <tr>
          <td>Id Pago: ${factura.pago.id_pago}</td>
        </tr>
        <tr>
          <td>Id MercadoPago: ${factura.pago.id_mercadopago}</td>
        </tr>
        <tr>
          <td>Fecha de pago: ${new Date(
            factura.pago.fecha,
          ).toLocaleString()}</td>
        </tr>
        <tr>
          <td>Valor pagado: $${factura.pago.monto}</td>
        </tr>
      </table>

      <!-- Cierre -->
      <table>
        <tr>
          <td style="text-align: center">
            <p>¡Muchas gracias por tu compra! ❤️</p>
            <p>Valor total: <strong>$${factura.factura.total}</strong></p>
          </td>
        </tr>
      </table>

      <!-- Footer -->
      <table class="footer">
        <tr>
          <td>Puppis - Tu tienda de mascotas favorita</td>
        </tr>
      </table>
  </body>
  </html>
  `
}

module.exports = { sendEmail }
