const {
  getRespuestas,
  createRespuesta,
} = require('../controllers/respuesta.controller')

const respuestaResolvers = {
  Query: {
    respuestas: async () => await getRespuestas(),
  },
  Mutation: {
    createRespuesta: async (_, args) => await createRespuesta(args),
  },
}

module.exports = respuestaResolvers
