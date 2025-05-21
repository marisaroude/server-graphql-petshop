const { ApolloServer } = require('@apollo/server')
const express = require('express')
const cors = require('cors')
const { expressMiddleware } = require('@apollo/server/express4')
const { sequelize } = require('./models')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers/index')
const mercadopagoRoutes = require('./routes/mercadopago.routes')
const { initClient } = require('./handlers/postgres.handler')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())
app.use(express.static('public'))

app.use('/api/mercadopago', mercadopagoRoutes)

async function startServer() {
  await initClient()

  // Passing an ApolloServer instance to the `startStandaloneServer` function:
  //  1. creates an Express app
  //  2. installs your ApolloServer instance as middleware
  //  3. prepares your app to handle incoming requests

  // Note you must call `start()` on the `ApolloServer`
  // instance before passing the instance to `expressMiddleware`
  await sequelize
    .authenticate()
    .then(() => {
      console.log('Database connected')
    })
    .catch(err => {
      console.error('Something happened: ', err)
    })

  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()
  app.use('/graphql', expressMiddleware(server))
  // Specify the path where we'd like to mount our server
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}/graphql`)
    console.log(`📦 REST API on http://localhost:${PORT}/api/mercadopago`)
  })
}

startServer()
