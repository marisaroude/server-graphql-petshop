// Resolvers define how to fetch the types defined in your schema.

const {
  Persona,
  Mascota,
  Proveedor,
  ProductoServicio,
  IngresoProducto,
  Promocion,
  Carrito,
  ProductoCarrito,
  Pregunta,
  Respuesta,
  Pago,
  Factura,
  DetalleFactura,
} = require('./models')

// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // we need complete with the queries
    personas: async () => await Persona.findAll(),
    mascotas: async () => await Mascota.findAll(),
    proveedores: async () => await Proveedor.findAll(),
    productosServicios: async () => await ProductoServicio.findAll(),
    ingresosProductos: async () => await IngresoProducto.findAll(),
    promociones: async () => await Promocion.findAll(),
    carritos: async () => await Carrito.findAll(),
    productosCarritos: async () => await ProductoCarrito.findAll(),
    detallefacturas: async () => await DetalleFactura.findAll(),
    facturas: async () => await Factura.findAll(),
    pagos: async () => await Pago.findAll(),
    preguntas: async () => await Pregunta.findAll(),
    respuestas: async () => await Respuesta.findAll(),
    mascotasByPersona: async (_, { idPersona }) => {
      const persona = await Persona.findByPk(idPersona)
      if (!persona) {
        throw new Error(`Persona with id ${idPersona} not found`)
      }
      return await persona.getMascotas()
    },
  },
  Mutation: {
    createPersona: async (
      _,
      { dni, nombre, apellido, telefono, correo_electronico, domicilio, tipo },
    ) =>
      await Persona.create({
        dni,
        nombre,
        apellido,
        telefono,
        correo_electronico,
        domicilio,
        tipo,
      }),

    createMascota: async (
      _,
      { id_persona, nombre, tipo, raza, descripcion, fecha_baja },
    ) =>
      await Mascota.create({
        id_persona,
        nombre,
        tipo,
        raza,
        descripcion,
        fecha_baja,
      }),

    createPago: async (_, { id_carrito, fecha, monto }) =>
      await Mascota.create({
        id_carrito,
        fecha,
        monto,
      }),

    createCarrito: async (_, { id_persona, fecha, monto, total }) =>
      await Mascota.create({
        id_persona,
        fecha,
        monto,
        total,
      }),

    createProductoCarrito: async (
      _,
      { cantidad, subtotal, id_ps, id_carrito }) =>
      await Mascota.create({
        cantidad,
        subtotal,
        id_ps,
        id_carrito,
      }),
  },
}

module.exports = { resolvers }
