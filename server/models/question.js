const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//define a story schema for the database
const QuestionSchema = new mongoose.Schema(
  {
    subject: String,
    tag: Array,
    question: String,
    writer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);


// compile model from schema
module.exports = mongoose.model("Question", QuestionSchema);
