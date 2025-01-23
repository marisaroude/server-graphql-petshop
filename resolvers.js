// Resolvers define how to fetch the types defined in your schema.

const { Persona } = require('./models')

// This resolver retrieves books from the "books" array above.
const resolvers = {
  Query: {
    // we need complete with the queries
    personas: async () => await Persona.findAll(),
  },
  Mutation: {
    // we need complete with the queries
  },
}

module.exports = { resolvers }
