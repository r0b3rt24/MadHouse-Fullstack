const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const landlordSchema = require("./landlord");
const leaserSchema = require("./leaser");

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
    leaser: {
      type: Schema.Types.ObjectId,
      ref: leaserSchema,
    },
    // landlord: {
    //   type: Schema.Types.ObjectId,
    //   ref: landlordSchema,
    // }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
