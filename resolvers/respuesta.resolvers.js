const {
  getRespuestas,
  createRespuesta,
  getRespuestasByPreguntaId,
  getAllRespuestas,
} = require('../controllers/respuesta.controller')

const respuestaResolvers = {
  Query: {
    respuestas: async () => await getRespuestas(),
    respuestasByPreguntaId: async (_, { id_preguntas }) =>
      await getRespuestasByPreguntaId({ id_preguntas }),
    allRespuestas: async () => await getAllRespuestas(),
  },
  Mutation: {
    createRespuesta: async (_, args) => await createRespuesta(args),
  },

  Respuesta: {
    autor: () => 'VeterinariaPupis',
  },
}

module.exports = respuestaResolvers
