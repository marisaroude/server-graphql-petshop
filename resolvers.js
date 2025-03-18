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

//aca deberiamos llamar a todos los resolvers dentro de /resolvers
const oldResolvers = {
  Query: {
    mascotas: async () => await Mascota.findAll(),
   
    ingresosProductos: async () => await IngresoProducto.findAll(),
    
    productosCarritos: async () => await ProductoCarrito.findAll(),
    
    pagos: async () => await Pago.findAll(),
    
    mascotasByPersona: async (_, { idPersona }) => {
      const persona = await Persona.findByPk(idPersona)
      if (!persona) {
        throw new Error(`Persona with id ${idPersona} not found`)
      }
      return await persona.getMascotas()
    },
  },
  Mutation: {
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

    cancelMascota: async (_, { id_mascota }) => {
      // Busca la persona por su clave primaria (id_persona)
      const mascota = await Mascota.findByPk(id_mascota)
      if (!mascota) {
        throw new Error('mascota no encontrada')
      }
      mascota.fecha_baja = new Date() // pone la fecha actual
      await mascota.save()

      // Fcambia el formato de la fecha antes de devolverla
      const fechaBajaFormateada = mascota.fecha_baja.toISOString()
      return {
        ...mascota.toJSON(), // Devuelve todos los campos de la mascota
        fecha_baja: fechaBajaFormateada, // Sobrescribe la fehca baja con un formato corrercto
      }
    },

        

    createPago: async (_, { id_carrito, fecha, monto }) =>
      await Pago.create({
        id_carrito,
        fecha,
        monto,
      }),

    createProductoCarrito: async (
      _,
      { cantidad, subtotal, id_ps, id_carrito },
    ) =>
      await ProductoCarrito.create({
        cantidad,
        subtotal,
        id_ps,
        id_carrito,
      }),

    createIngresoProducto: async (
      _,
      { id_proveedor, subtotal, cantidad, id_ps },
    ) =>
      await IngresoProducto.create({
        id_proveedor,
        subtotal,
        cantidad,
        id_ps,
      }),

    
    deleteProductosCarrito: async (_, { id_pc }) => {
      const product = await ProductoCarrito.findByPk(id_pc)

      if (!product) {
        throw new Error('Product not found')
      }

      await ProductoCarrito.destroy({
        where: { id_pc: id_pc },
      })

      return product
    },
  },
}

module.exports = { oldResolvers }
