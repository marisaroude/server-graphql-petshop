// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
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
    domicilio:String!
    tipo:Boolean!
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

    type Query {
    personas: [Persona]
    mascotas: [Mascota]
    }

    type Mutation {
    createPersona(dni: String!,
    nombre: String!,
    apellido: String!,
    telefono: String!,
    correo_electronico: String!,
    domicilio:String!,
    tipo:Boolean!,
    fecha_baja: String) : Persona
    }

  
`

module.exports = { typeDefs }
