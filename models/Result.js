const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const resultSchema = new Schema(
  {
    userId: {
      type: Schema.Types.Object,
      required: true
    },
    tweetId: {
      type: Schema.Types.Object,
      unique: true,
      required: true
    },
    description: {
      type: String
    },
    done: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Result", resultSchema);
