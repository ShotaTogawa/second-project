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
    tweet: {
      type: String,
      required: true
    },
    commentId: {
      type: Schema.Types.ObjectId
    },
    resultId: {
      type: Schema.Types.ObjectId
    },
    public: {
      type: Boolean,
      default: false
    },
    tag: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Tweeet", tweetSchema);
