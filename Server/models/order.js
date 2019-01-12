const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/*
{
    landlord: '', // id of the landlord
    leaser: '', // id of the leaser
    asset: '',  // id of the asset
    status: [ // enum of string
      'Pending',
      'Ongoing',
      'Ended',
      'Issue',
    ],
    startDate: date,
    endDate: date,
    comment: '',
    payment: ''
  }

   Order */


const orderSchema = new Schema({
    startDate: Date,
    endDate: Date,
    comment: String,
    status: {
      type: String,
      enum: ['Pending', 'Ongoing', 'Ended', 'Issue']
    },
    leaser: {
      type: Schema.Types.ObjectId,
      ref: "leaser",
    },
    landlord: {
      type: Schema.Types.ObjectId,
      ref: "landlord",
    }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
