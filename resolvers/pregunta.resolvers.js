// solo query y mutation de pregunta

const {
    getPregunta,
    createPregunta,
    getPreguntasByProductId,
  } = require('../controllers/pregunta.controller')
  
  ///aca llama al controller y retorna
  
  const preguntaResolvers = {
  Query: {
    preguntas: async () => await getPregunta(),
    preguntasByProductId: async (_, id_ps ) => await getPreguntasByProductId( id_ps )
  },
  Mutation: {
    createPregunta: async (_, { descripcion, id_persona, id_ps, estado }) => {
      return await createPregunta({
        descripcion,
        id_persona,
        id_ps,
        estado: estado || false // estado por defecto
      });
    },
  },
};
  module.exports = preguntaResolvers