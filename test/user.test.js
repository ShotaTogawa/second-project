const { ApolloServer, gql } = require("apollo-server");
const { createTestClient } = require("apollo-server-testing");
const typeDefs = require("../typeDefs");
const resolvers = require("../resolvers");

const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { query, mutate } = createTestClient(server);

it("should signup user", async () => {});

it("should signin user", async () => {});

it("should signout user", async () => {});
