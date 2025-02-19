const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. 

  #We need create a types for Query, Fields, Mutation.

  type Persona {
    id_persona: Int!
    dni: String!
    nombre: String!
    apellido: String!
    telefono: String!
    correo_electronico: String!
    domicilio: String!
    tipo: Boolean!
    fecha_baja: String
  }

  type Mascota {
    id_mascota: Int!
    id_persona: Int!
    nombre: String!
    tipo: String!
    raza: String
    descripcion: String
    fecha_baja: String
  }

  type Proveedor {
    id_proveedor: Int!
    nombre: String!
    cuit: String!
    activo: Boolean!
  }

  type ProductoServicio {
    id_ps: Int!
    nombre: String!
    precio: Int!
    stock: Int!
    descripcion: String
    categoria: String!
    activo: Boolean!
  }

  type IngresoProducto {
    id_ip: Int!
    id_proveedor: Int!
    subtotal: Int!
    cantidad: Int!
    id_ps: Int!
  }

  type Promocion {
    id_promocion: Int!
    valor: Float!
    fecha_inicio: String!
    fecha_fin: String!
    activo: Boolean!
    id_ps: Int
  }

  type Carrito {
    id_carrito: Int!
    fecha: String!
    total: Float!
    id_persona: Int!
  }

  type ProductoCarrito {
    id_pc: Int!
    cantidad: Int!
    subtotal: Float!
    id_ps: Int!
    id_carrito: Int!
  }

  type Pregunta {
    id_preguntas: Int!
    descripcion: String!
    estado: Boolean!
    id_persona: Int!
    id_ps: Int!
  }

  type Respuesta {
    id_respuesta: Int!
    descripcion: String!
    id_preguntas: Int!
  }

  type Pago {
    id_pago: Int!
    id_carrito: Int!
    fecha: String!
    monto: Float!
  }

  type Factura {
    id_factura: Int!
    id_pago: Int!
    fecha: String!
    total: Float!
  }

  type DetalleFactura {
    id_df: Int!
    cantidad: Int!
    precio: String!
    id_ps: Float!
    id_factura: Int!
  }

  type Query {
    personas: [Persona]
    mascotas: [Mascota]
    proveedores: [Proveedor]
    productosServicios: [ProductoServicio]
    ingresosProductos: [IngresoProducto]
    promociones: [Promocion]
    carritos: [Carrito]
    productosCarritos: [ProductoCarrito]
    preguntas: [Pregunta]
    respuestas: [Respuesta] 
    pagos: [Pago] 
    facturas: [Factura] 
    detallefacturas: [DetalleFactura] 
  }

  type Mutation {
    createPersona(
      dni: String!,
      nombre: String!,
      apellido: String!,
      telefono: String!,
      correo_electronico: String!,
      domicilio: String!,
      tipo: Boolean!,
      fecha_baja: String
    ): Persona

    createMascota(
      id_persona: Int!,
      nombre: String!,
      tipo: String!,
      raza: String,
      descripcion: String,
      fecha_baja: String,
    ): Mascota

    createIngresoProducto(
      id_proveedor:Int!
      subtotal:Float!
      cantidad:Int!
      id_ps:Int!
    ): IngresoProducto

    createProductoServicio(
      nombre:String!,
      precio:Float!,
      stock:Int!,
      descripcion:String,
      categoria: String,
      activo:Boolean!,
    ): ProductoServicio

    createProveedor(
      nombre:String!,
      cuit:String!,
      activo:Boolean!,
    ): Proveedor

  }
` 

module.exports = { typeDefs }
