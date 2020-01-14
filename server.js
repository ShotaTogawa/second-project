const express = require("express");
const { ApolloServer, gql } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./typeDefs");
const resolvers = require("./resolvers");
const jwt = require("jsonwebtoken");
const User = require("./models/User");

require("dotenv").config({ path: "variables.env" });
require("./db/mongoose");

const PORT = 4000;

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credential: true
};

app.use(cors(corsOptions));

// app.use(async (req, res, next) => {
//   const token = req.headers["authorization"];
//   if (token !== null) {
//     try {
//       const currentUser = await jwt.verify(token, process.env.SECRET);
//       req.currentUser = currentUser;
//       console.log("current", currentUser);
//     } catch (e) {
//       console.error(e);
//     }
//   }
//   next();
// });

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
        console.log("kdofako", currentUser);
        req.currentUser = currentUser;
      }
    } catch (e) {
      console.error(`Unable to authenticate user with token ${authToken}`);
    }
    return { currentUser };
  }
});
server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`listening ${PORT}`));
