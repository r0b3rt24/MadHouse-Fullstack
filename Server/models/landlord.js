const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = require("./order");

/* 
{
  id: '1ds1fs7sdfnas',
  assets: [ // array asset id
    "1dewr7sad8ads", "a6s7d8sa68d7sa",
  ],
  orders: [ // array of order id
    "1dewr7sad8ads", "a6s7d8sa68d7sa",
  ],
}

Landlord */

//creates Storage Schema & model
const landlordSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username field is required'],
    },
    firstname: {
        type: String, 
        required: true,
    },
    lastname: {
        type: String, 
        required: true,
    },
    registerdate: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    },
    order: [{
        type: Schema.Types.ObjectId,
        ref: orderSchema,
    }]
})

// represent a collection called Storage by MongoDB
const Landlord = mongoose.model('landlord', landlordSchema);

//Export it
module.exports = Landlord;

