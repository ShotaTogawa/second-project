const User = require("./models/User");

module.exports = {
  Query: {
    hello: () => "Hello world!"
  },
  Mutation: {
    signupUser: async (parent, { input }, ctx) => {
      const user = await new User({
        name: input.name,
        email: input.email,
        password: input.password
      }).save();
      return user;
    }
  }
};
