const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    likes: {
      type: Number,
      default: 0
    },
    title: {
      type: String
    },
    tweet: {
      type: String,
      required: true
    },
    commentId: {
      type: Schema.Types.ObjectId
    },
    resultId: {
      type: Schema.Types.ObjectId,
      ref: "Result"
    },
    public: {
      type: Boolean,
      default: false
    },
    image: {
      type: String,
      default: null
    },
    tag: {
      type: String
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tweet", tweetSchema);
