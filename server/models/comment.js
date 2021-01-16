const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

//define a story schema for the database
const commentSchema = new mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId, 
    ref: "User"
  }, 
  questionId: {
    type: Schema.Types.ObjectId,
    ref: "Question"
  }, 
  responseTo: {
    type: Schema.Types.ObjectId, 
    ref: 'User'
  }, 
  content: String
}, { timestamps: true });

// compile model from schema
module.exports = mongoose.model("comment", commentSchema);