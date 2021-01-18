const mongoose = require("mongoose");
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

//define a story schema for the database
const QuestionSchema = new mongoose.Schema({
  subject: String,
  tag: String,
  question: String,
});

QuestionSchema.plugin(mongoose_fuzzy_searching, { 
  fields: ['subject'] });


// compile model from schema
module.exports = mongoose.model("question", QuestionSchema);


//const Questions = new Question({ subject: 'peanut', tag: 'lol', question: "why?" });


