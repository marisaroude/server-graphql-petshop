const { ApolloServer } = require('@apollo/server')
const express = require('express')
const cors = require('cors')
const { expressMiddleware } = require('@apollo/server/express4')
const { sequelize } = require('./models')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers/index')
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const app = express()

async function startServer() {
  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await server.start()
  app.use('/graphql', cors(), express.json(), expressMiddleware(server))
  // Specify the path where we'd like to mount our server
  app.listen(4000, () => {
    console.log(`Server is live on port 4000`)
    console.log(`prueba`)
  })

  sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => {
      console.error('Something happened: ', err)
    })
}

startServer()
