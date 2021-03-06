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
    title: String
    tweet: String!
    commentId: String!
    resultId: String
    public: Boolean
    image: String
    tag: String
    createdAt: String!
    user: User
  }

  type Comment {
    _id: ID
    userId: String!
    tweetId: String!
    comment: String!
    createdAt: String
    user: User
  }

  type Result {
    _id: ID
    userId: String!
    tweetId: String!
    done: Boolean!
    description: String!
    createdAt: String
    image: String
  }

  type Query {
    hello: String
    getCurrentUser: User
    getUser(_id: ID!): User
    getTweet(_id: ID!): Tweet
    getTweets(userId: String!): [Tweet]
    getPublicTweets: [Tweet]
    # getLikes(_id: ID!): Tweet
    getComments(tweetId: String!): [Comment]
    getResult(tweetId: String!): Result
    getResults(userId: String!): [Result]
  }

  type Mutation {
    signinUser(email: String!, password: String!): Token
    signupUser(name: String!, email: String!, password: String!): Token
    deleteUser(_id: ID!): User
    updateAvatar(_id: ID!, avatar: String!): User
    postTweet(
      userId: String!
      tweet: String!
      tag: String
      title: String
      public: Boolean
    ): Tweet
    deleteTweet(_id: ID!): Tweet
    editTweet(_id: ID!, tweet: String!, tag: String): Tweet
    likeTweet(_id: ID!, userId: ID!): Tweet
    unlikeTweet(_id: ID!, userId: ID!): Tweet
    followFriend(_id: ID!, friendId: ID!): User
    unfollowFriend(_id: ID!, friendId: ID!): User
    addComment(userId: String!, tweetId: String!, comment: String!): Comment
    deleteComment(_id: ID!): Comment
    editComment(_id: ID!, comment: String!): Comment
    addResult(
      userId: String!
      tweetId: String!
      description: String!
      done: Boolean
      image: String
    ): Result
    deleteResult(_id: ID!): Result
    updateResult(
      _id: ID!
      status: Int
      description: String
      done: Boolean
    ): Result
  }
`;
