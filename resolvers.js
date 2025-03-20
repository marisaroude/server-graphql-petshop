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

    proveedores: async () => await Proveedor.findAll(),
    productosServicios: async () => await ProductoServicio.findAll(),
    ingresosProductos: async () => await IngresoProducto.findAll(),
    promociones: async () => await Promocion.findAll(),
    carritos: async () => await Carrito.findAll(),
    detallefacturas: async () => await DetalleFactura.findAll(),
    facturas: async () => await Factura.findAll(),
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
    
    createPregunta: async (
      _,
      { idPreguntas, descripcion, estado, id_persona, id_ps },
    ) =>
      await Pregunta.create({
        idPreguntas,
        descripcion,
        estado,
        id_persona,
        id_ps,
      }),

    createRespuesta: async (_, { id_respuesta, descripcion, id_preguntas }) =>
      await Respuesta.create({
        id_respuesta,
        id_preguntas,
      }),

    createPromocion: async (
      _,
      { id_promocion, porcentaje, fecha_inicio, fecha_fin, id_ps },
    ) =>
      await Promocion.create({
        id_promocion,
        porcentaje,
        fecha_inicio,
        fecha_fin,
        id_ps,
      }),

    cancelPromocion: async (_, { id_promocion }) => {
      const promocion = await Promocion.findByPk(id_promocion)
      if (!promocion) {
        throw new Error('promocion no encontrada')
      }

      // Marca la promoción como inactiva
      promocion.activo = false
      await promocion.save()

      return promocion
    },

    
    createCarrito: async (_, { id_persona, fecha, total }) =>
      await Carrito.create({
        id_persona,
        fecha,
        total,
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

    createProductoServicio: async (
      _,
      { nombre, precio, stock, descripcion, categoria, activo },
    ) =>
      await ProductoServicio.create({
        nombre,
        precio,
        stock,
        descripcion,
        categoria,
        activo,
      }),

    createProveedor: async (_, { nombre, cuit, activo }) =>
      await Proveedor.create({
        nombre,
        cuit,
        activo,
      }),
    
    cancelProductoServicios: async (_, { id_ps }) => {
      const product = await ProductoServicio.findByPk(id_ps)

      if (!product) {
        throw new Error('Product not found')
      }

      await ProductoServicio.update(
        { activo: false },
        { where: { id_ps: id_ps } },
      )

      return { ...product.toJSON(), activo: false }
    },
  },
}

module.exports = { oldResolvers }
