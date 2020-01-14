const { gql } = require("apollo-server");

module.exports = gql`
  type Token {
    token: String!
  }

  type User {
    _id: ID
    name: String!
    email: String!
    password: String!
    avatar: String
  }

  type Query {
    hello: String
    getCurrentUser: User
  }

  type Mutation {
    signinUser(email: String!, password: String!): Token
    signupUser(name: String!, email: String!, password: String!): Token
  }
`;
