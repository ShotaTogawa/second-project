const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Tweet = require("./models/Tweet");

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ email: user.email }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    hello: () => "Hello world!",
    // user
    getCurrentUser: async (parent, _, { currentUser }) => {
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
      const tweets = await Tweet.find({public: true}).sort({ createdAt: "desc" });
      return tweets;
    },
    // comment
    getComments: () => {},
    // result
    getResult: () => {},
    getResults: () => {}
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

    // tweet
    postTweet: async (parent, args, { currentUser }) => {
      if (!currentUser) {
        throw new Error("Please sign in");
      }
      try {
        const tweet = await new Tweet({
          userId: args.userId,
          tweet: args.tweet
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
          { tweet: args.tweet }
        );

        return tweet;
      } catch (e) {
        console.error(e);
      }
    }
    // comment

    // result
  }
};
