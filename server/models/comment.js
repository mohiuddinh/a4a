const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

//code citation: https://github.com/jaewonhimnae/react-youtube-clone/blob/master/server/models/Comment.js
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
module.exports = mongoose.model("Comment", commentSchema);