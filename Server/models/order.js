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
    landlord: landlordSchema,
    leaser: leaserSchema,
    startDate: Date,
    endDate: Date,
    comment: String,
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
