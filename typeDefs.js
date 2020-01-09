const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    hello: String
  }

  type User {
    _id: String
    name: String!
    email: String!
    password: String!
    avatar: String
  }

  input SignupUserInput {
    name: String!
    email: String!
    password: String!
  }

  type Mutation {
    signupUser(input: SignupUserInput!): User
  }
`;
