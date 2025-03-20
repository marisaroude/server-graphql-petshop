// solo query y mutation de pregunta

const {
    getPregunta,
    createPregunta,
  } = require('../controllers/pregunta.controller')
  
  ///aca llama al controller y retorna
  
  const preguntaResolvers = {
    Query: {
      preguntas: async () => await getPregunta(),
    },
    Mutation: {
      createPregunta: async (_, args) => await createPregunta(args),
      
    },
  }
  
  module.exports = preguntaResolvers