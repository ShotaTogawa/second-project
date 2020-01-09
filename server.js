const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");

require("dotenv").config({ path: "variables.env" });
require("./db/mongoose");

const PORT = 4000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credential: true
};

app.use(cors(corsOptions));

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`listening ${PORT}`));
