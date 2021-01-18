const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new mongoose.Schema({
   userId: {
       type: Schema.Types.ObjectId,
       ref: 'User'
   },
   commentId: {
       type: Schema.Types.ObjectId,
       ref: 'Comment'
   },
   questionId: {
       type: Schema.Types.ObjectId,
       ref: 'Question'
   }

}, { timestamps: true })

module.exports = mongoose.model("Like", likeSchema);