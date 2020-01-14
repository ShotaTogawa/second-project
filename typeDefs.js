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
    joinedDate: String
    favorites: [Tweet]
    friends: [User]
  }

  type Tweet {
    _id: ID
    userId: String!
    likes: Int
    tweet: String!
    commentId: String!
    resultId: String
    public: Boolean
    createdAt: String!
  }

  type Comment {
    _id: ID
    userId: String!
    tweetId: String!
    comment: String!
  }

  type Result {
    _id: ID
    userId: String!
    tweetId: String!
    done: Boolean!
    description: String!
  }

  type Query {
    hello: String
    getCurrentUser: User
    getTweet(_id: ID!): Tweet
    getTweets(userId: String!): [Tweet]
    getPublicTweets: [Tweet]
    getComments(tweetId: String!): [Comment]
    getResult(tweetId: String!): Result
    getResults(userId: String!): [Result]
  }

  type Mutation {
    signinUser(email: String!, password: String!): Token
    signupUser(name: String!, email: String!, password: String!): Token
    postTweet(userId: String!, tweet: String!): Tweet
    deleteTweet(_id: ID!): Tweet
    editTweet(_id: ID!, tweet: String!): Tweet
    addComment(userId: String!, tweetId: String!, comment: String!): Comment
    deleteComment(_id: ID!): Comment
    editComment(_id: ID!, comment: String!): Comment
    addResult(tweetId: String!, description: String!): Result
    deleteResult(_id: ID!): Result
    updateResult(
      _id: ID!
      status: Int
      description: String
      done: Boolean
    ): Result
  }
`;
