// solo query y mutation de persona

const {
  getPersonas,
  createPersona,
  cancelPersona,
  updatePersona,
  getMascotasByIDPersona,
  getPersonByEmail,
} = require('../controllers/persona.controller')

///aca llama al controller y retorna

const personaResolvers = {
  Query: {
    personas: async () => await getPersonas(),
    getPersonByEmail: async (_, email) => await getPersonByEmail(email),
    mascotasByPersona: async (_, args) => await getMascotasByIDPersona(args),
  },
  Mutation: {
    createPersona: async (_, args) => await createPersona(args),
    cancelPersona: async (_, id_persona) => await cancelPersona(id_persona),
    updatePersona: async (_, args) => await updatePersona(args),
  },
}

module.exports = personaResolvers
