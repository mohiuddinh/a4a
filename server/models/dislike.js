const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//code citation: https://github.com/jaewonhimnae/react-youtube-clone/blob/master/server/models/Dislike.js
const dislikeSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Dislike", dislikeSchema);
