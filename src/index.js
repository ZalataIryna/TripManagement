const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
dotenv.config();

const PORT = 4000;

function start() {
  const app = initServer();
  connectMiddlewares(app);
  // declareRoutes(app);
  connectToDb();
  listen(app);
}

function initServer() {
  return express();
}

function connectMiddlewares(app) {
  app.use(express.json());
  app.use(cors({ origin: '*' }));
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  server.applyMiddleware({ app });
}

// function declareRoutes(app) {
//   app.get('/', (req, res) => {
//     try {
//       return res.send('Hello world');
//     } catch (error) {
//       res.status(400).send(error.message);
//     }
//   });
// }

async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connection successful');
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
}

function listen(app) {
  app.listen(PORT, () => {
    console.log(`🚀  Server is listening on port ${PORT}`);
  });
}

start();
