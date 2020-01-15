const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  userId: {
    type: Schema.Types.Object,
    required: true
  },
  tweetId: {
    type: Schema.Types.Object,
    required: true
  },
  comment: {
    type: String
  }
});

module.exports = mongoose.model("Comment", commentSchema);
