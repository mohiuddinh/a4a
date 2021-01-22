const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const mongoose_fuzzy_searching = require('mongoose-fuzzy-searching');

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

QuestionSchema.plugin(mongoose_fuzzy_searching, { 
  fields: ['subject'] });


// compile model from schema
module.exports = mongoose.model("Question", QuestionSchema);
