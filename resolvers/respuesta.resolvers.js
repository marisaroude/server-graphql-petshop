const {
  getRespuestas,
  createRespuesta,
  getRespuestasByPreguntaId,
} = require("../controllers/respuesta.controller");

const respuestaResolvers = {
  Query: {
    respuestas: async () => await getRespuestas(),
    respuestasByPreguntaId: async (_, { id_pregunta }) =>
      await getRespuestasByPreguntaId({ id_pregunta }),
  },
  Mutation: {
    createRespuesta: async (_, args) => await createRespuesta(args),
  },

  Respuesta: {
    autor: () => "VeterinariaPupis",
  },
};

module.exports = respuestaResolvers;
