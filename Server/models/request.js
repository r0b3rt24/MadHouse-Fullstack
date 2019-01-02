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


const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const landlord = require('./landlord')

const orderSchema = new Schema({
    Time: {
        type: String,
        required: [true, 'Time field is required'],
    },
    landlord: landlord,
    leaser: leaser,
    startDate: Date,
    endDate: Date,
    comment: String, 

})

// represent a collection called Storage by MongoDB
const order = mongoose.model('order', orderSchema);

//Export it
module.exports = order;