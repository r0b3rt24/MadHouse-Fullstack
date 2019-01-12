const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
{
    order: '',  // id of order
    rating: 5,  // integer from 1-5
    comment: "", 
    date: date,
  }
Comment */


const commentSchema = new Schema({
    order: {
        type: Schema.Types.ObjectId,
        ref: "order",
        required: [true, "orderSchema is required"],
        unique: true
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
    },
    comment: String,
    date: {
        type: Date,
        default: Date.now
    }
})

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;