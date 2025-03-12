// solo query y mutation de persona

const {
  getPersona,
  createPersona,
  cancelPersona,
  updatePersona,
} = require('../controllers/persona.controller')

///aca llama al controller y retorna

const personaResolvers = {
  Query: {
    personas: async () => await getPersona(),
  },
  Mutation: {
    createPersona: async (_, args) => await createPersona(args),
    cancelPersona: async (_, id_persona) => await cancelPersona(id_persona),
    updatePersona: async (_, args) => await updatePersona(args),
  },
}

module.exports = personaResolvers
