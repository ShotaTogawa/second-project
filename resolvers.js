const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("./models/User");

const createToken = (user, secret, expiresIn) => {
  return jwt.sign({ email: user.email }, secret, {
    expiresIn
  });
};

module.exports = {
  Query: {
    hello: () => "Hello world!",
    getCurrentUser: async (parent, _, { currentUser }) => {
      const user = await User.findOne({ email: currentUser.email });
      console.log(user);
      return user;
    }
  },
  Mutation: {
    signupUser: async (parent, { name, email, password }, ctx) => {
      const user = await User.findOne({ email: email });
      if (user) {
        throw new Error("User already exists");
      }
      const newUser = await new User({
        name: name,
        email: email,
        password: password
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
    }
  }
};
