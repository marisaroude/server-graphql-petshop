const personaResolvers = require('./persona.resolvers')

const resolvers = {
  Query: {
    ...personaResolvers.Query,
  },
  Mutation: {
    ...personaResolvers.Mutation,
  },
}

module.exports = { resolvers }
