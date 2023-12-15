const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

// Database Connection
// Database Connection
// Database Connection
const URL = 'mongodb+srv://emarianoruiz:Ensiferum450@cluster0.kmy2xp5.mongodb.net/';

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("DB CONNECTED"))
  .catch(err => console.error("DB CONNECTION ERROR", err));

const startServer = async () => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await apolloServer.start();
  apolloServer.applyMiddleware({ app });

  const IP = '192.168.231.72'; // Reemplaza con tu dirección IP
  const PORT = process.env.PORT || 5000;

  //app.listen(4000,IP, () => console.log("Server UP & Running on port 4000"));
  app.listen(4000, () => console.log("Server UP & Running on port 4000")); //aqui es
  console.log("GraphQL endpoint: http://localhost:4000/graphql");
};

startServer();
