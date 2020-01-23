import { gql } from "apollo-boost";

/* User's query */

export const GET_CURRENT_USER = gql`
  query {
    getCurrentUser {
      _id
      name
      email
      favorites {
        _id
      }
    }
  }
`;

/* User's mutations */
export const SIGNUP_USER = gql`
  mutation($name: String!, $email: String!, $password: String!) {
    signupUser(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

export const SIGNIN_USER = gql`
  mutation($email: String!, $password: String!) {
    signinUser(email: $email, password: $password) {
      token
    }
  }
`;

/* Tweet's query */
export const GET_PUBLIC_TWEETS = gql`
  query {
    getPublicTweets {
      _id
      likes
      tweet
      tag
      resultId
      userId
    }
  }
`;

export const GET_TWEET = gql`
  query($_id: ID!) {
    getTweet(_id: $_id) {
      _id
      tweet
      tag
      public
    }
  }
`;

// export const GET_LIKES = gql`
//   query($_id: ID!) {
//     getLikes(_id: $_id) {
//       likes
//     }
//   }
// `;

/* Tweet's mutations */
export const POST_TWEET = gql`
  mutation($userId: String!, $tweet: String!, $tag: String, $public: Boolean) {
    postTweet(userId: $userId, tweet: $tweet, tag: $tag, public: $public) {
      userId
      tweet
      tag
      public
    }
  }
`;

export const UPDATE_TWEET = gql`
  mutation($_id: ID!, $tweet: String!, $tag: String) {
    editTweet(_id: $_id, tweet: $tweet, tag: $tag) {
      _id
      tweet
      tag
    }
  }
`;

export const DELETE_TWEET = gql`
  mutation($_id: ID!) {
    deleteTweet(_id: $_id) {
      _id
    }
  }
`;

/* Comment's query */
export const GET_COMMENTS = gql`
  query($tweetId: String!) {
    getComments(tweetId: $tweetId) {
      _id
      userId
      comment
      createdAt
    }
  }
`;

/* Comment's mutations */
export const ADD_COMMENT = gql`
  mutation($userId: String!, $tweetId: String!, $comment: String!) {
    addComment(userId: $userId, tweetId: $tweetId, comment: $comment) {
      _id
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation($_id: ID!) {
    deleteComment(_id: $_id) {
      _id
    }
  }
`;

export const LIKE_TWEET = gql`
  mutation($_id: ID!, $userId: ID!) {
    likeTweet(_id: $_id, userId: $userId) {
      _id
      likes
    }
  }
`;

export const UNLIKE_TWEET = gql`
  mutation($_id: ID!, $userId: ID!) {
    unlikeTweet(_id: $_id, userId: $userId) {
      _id
      likes
    }
  }
`;

/* Result's query */
export const GET_RESULT = gql`
  query($tweetId: String!) {
    getResult(tweetId: $tweetId) {
      _id
      tweetId
      done
      description
      createdAt
      image
    }
  }
`;

/* Result's mutations */
export const ADD_RESULT = gql`
  mutation(
    $userId: String!
    $tweetId: String!
    $description: String!
    $done: Boolean
    $image: String
  ) {
    addResult(
      userId: $userId
      tweetId: $tweetId
      description: $description
      done: $done
      image: $image
    ) {
      _id
      tweetId
      description
      createdAt
      done
      image
    }
  }
`;
