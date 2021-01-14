const mongoose = require("mongoose");

//define a story schema for the database
const QuestionSchema = new mongoose.Schema({
  subject: String,
  tag: String,
  question: String,
});

// compile model from schema
module.exports = mongoose.model("question", QuestionSchema);