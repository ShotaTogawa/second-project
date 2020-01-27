const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "variables.env" });
require("./db/mongoose");

const PORT = process.env.PORT || 4000;

const app = express();
const path = "/graphql";

const corsOptions = {
  origin: process.env.END_POINT,
  credential: true
};

app.use(cors(corsOptions));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    let authToken = null;
    let currentUser = null;
    try {
      authToken = req.headers.authorization;
      if (authToken) {
        currentUser = await jwt.verify(authToken, process.env.SECRET);
        // req.currentUser = currentUser;
        // console.log(req.currentUser);
      }
    } catch (e) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});

if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

server.applyMiddleware({ app, path });

app.listen(PORT, () => console.log(`listening ${PORT}`));
