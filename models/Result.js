const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    tweetId: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    },
    done: {
      type: Boolean,
      default: false
    },
    image: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Result", resultSchema);
