const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Tweet = require("./models/Tweet");
const Comment = require("./models/Comment");
const Result = require("./models/Result");

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ email: user.email }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    // user
    getCurrentUser: async (parent, _, { currentUser }) => {
      if (!currentUser) {
        return null;
      }
      const user = await User.findOne({ email: currentUser.email });
      return user;
    },
    // tweet
    getTweet: async (parent, { _id }, ctx) => {
      const tweet = await Tweet.findById(_id);
      if (!tweet) {
        throw new Error("Tweet not found");
      }
      return tweet;
    },
    getTweets: async (parent, { userId }, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      const tweets = await Tweet.find({ userId });
      return tweets;
    },
    getPublicTweets: async (parent, args, ctx) => {
      const tweets = await Tweet.find({ public: true }).sort({
        createdAt: "desc"
      });
      return tweets;
    },
    // comment
    getComments: async (parent, { tweetId }, ctx) => {
      const comments = await Comment.find({ tweetId }).sort({
        createdAt: "desc"
      });
      return comments;
    },
    // result
    getResult: async (parent, { tweetId }, ctx) => {
      const result = await Result.findOne({ tweetId });
      return result;
    },
    getResults: async (parent, { userId }, ctx) => {
      const results = await Result.find({ userId });
      return results;
    }
  },
  Mutation: {
    // auth
    signupUser: async (parent, { name, email, password }, ctx) => {
      const user = await User.findOne({ email });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        name,
        email,
        password
      }).save();

      return { token: createToken(newUser, process.env.SECRET, "1hr") };
    },
    signinUser: async (parent, { email, password }, ctx) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User not found");
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Password is invalid");
      }
      return { token: createToken(user, process.env.SECRET, "1hr") };
    },
    // user
    deleteUser: async (parent, { _id }, ctx) => {
      try {
        await User.findByIdAndDelete(_id);
        await Tweet.deleteMany({ userId: _id });
        await Comment.deleteMany({ userId: _id });
        await Result.deleteMany({ userId: _id });
      } catch (e) {
        console.log(e);
      }
    },

    // tweet
    postTweet: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const tweet = await new Tweet({
          userId: args.userId,
          tweet: args.tweet,
          tag: args.tag,
          public: args.public
        }).save();

        return tweet;
      } catch (e) {
        console.error(e);
      }
    },
    deleteTweet: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }

      try {
        return await Tweet.findByIdAndDelete(args._id);
      } catch (e) {
        console.error(e);
      }
    },
    editTweet: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const tweet = await Tweet.findOneAndUpdate(
          { _id: args._id },
          { tweet: args.tweet, tag: args.tag }
        );

        return tweet;
      } catch (e) {
        console.error(e);
      }
    },
    // comment
    addComment: async (
      parent,
      { userId, tweetId, comment },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const userComment = await new Comment({
          userId,
          tweetId,
          comment
        }).save();
        if (!comment) {
          throw new Error("Failed to comment");
        }
        return userComment;
      } catch (e) {
        console.error(e);
      }
    },
    deleteComment: async (parent, { _id }, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      await Comment.findByIdAndDelete(_id);
    },
    editComment: async (parent, { _id, comment }, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const editedComment = await Comment.findByIdAndUpdate(
          { _id },
          { comment }
        );
        return editedComment;
      } catch (e) {
        console.error(e);
      }
    },
    // result
    addResult: async (
      parent,
      { userId, tweetId, description },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }

      try {
        const result = await new Result({
          userId,
          tweetId,
          description
        }).save();
        return result;
      } catch (e) {
        console.error(e);
      }
    },
    deleteResult: async (parent, { _id }, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      return await Result.findByIdAndRemove(_id);
    },
    updateResult: async (
      parent,
      { _id, status, description, done },
      { currentUser }
    ) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const result = await Result.findByIdAndUpdate(
          { _id },
          { status, description, done }
        );
        return result;
      } catch (e) {
        console.error(e);
      }
    }
  }
};
