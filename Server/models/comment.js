/* 
{
    order: '',  // id of order
    rating: 5,  // integer from 1-5
    comment: "", 
    date: date,
  }
Comment */

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    order: String,
    rating: Number,
    comment: String,
    date: Date, 
})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;