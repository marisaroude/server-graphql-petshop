
// Resolvers define how to fetch the types defined in your schema.
const { omitBy, isUndefined } = require('lodash') // Para limpiar valores undefined


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
} = require('./models');

const resolvers = {
  Query: {
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
      const persona = await Persona.findByPk(idPersona);
      if (!persona) {
        throw new Error(`Persona with id ${idPersona} not found`);
      }
      return await persona.getMascotas();
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

    cancelPersona: async (_, { id_persona }) => {
        // Busca la persona por su clave primaria (id_persona)
      const persona = await Persona.findByPk(id_persona);
      if (!persona) {
        throw new Error('Persona no encontrada');
      }
      persona.fecha_baja = new Date(); // pone la fecha actual
      await persona.save();

      // Fcambia el formato de la fecha antes de devolverla
      const fechaBajaFormateada = persona.fecha_baja.toISOString();
      return {
              ...persona.toJSON(),  // Devuelve todos los campos de la persona
              fecha_baja: fechaBajaFormateada // Sobrescribe la fehca baja con un formato corrercto
            }
    },

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
      const mascota = await Mascota.findByPk(id_mascota);
      if (!mascota) {
        throw new Error('mascota no encontrada');
      }
      mascota.fecha_baja = new Date(); // pone la fecha actual
      await mascota.save();

      // Fcambia el formato de la fecha antes de devolverla
      const fechaBajaFormateada = mascota.fecha_baja.toISOString();
      return {
              ...mascota.toJSON(),  // Devuelve todos los campos de la mascota
              fecha_baja: fechaBajaFormateada // Sobrescribe la fehca baja con un formato corrercto
            }
    },

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
        const promocion = await Promocion.findByPk(id_promocion);
        if (!promocion) {
          throw new Error('promocion no encontrada');
        }
  
        // Marca la promoción como inactiva
        promocion.activo = false;
        await promocion.save();
  
        return promocion; 
      },

    createPago: async (_, { id_carrito, fecha, monto }) =>
      await Pago.create({
        id_carrito,
        fecha,
        monto,
      }),

    createCarrito: async (_, { id_persona, fecha, total }) =>
      await Carrito.create({
        id_persona,
        fecha,
        total,
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
    updatePersona: async (_, { id_persona, input }) => {
      const persona = await Persona.findByPk(id_persona)
      if (!persona) {
        throw new Error('Person not found')
      }
      //
      // Filtrar valores undefined para evitar sobrescribir con null
      const dataToUpdate = omitBy(input, isUndefined)

      await Persona.update(dataToUpdate, {
        where: { id_persona },
      })

      return { ...persona.toJSON(), ...dataToUpdate }
    },
  },
};

module.exports = { resolvers };