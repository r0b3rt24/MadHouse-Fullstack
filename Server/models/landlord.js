const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const orderSchema = require("./order");
const userSchema = require("./user");

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
    user: {
        type: Schema.Types.ObjectId,
        ref: uderSchema,
    },
    orders: [{
        type: Schema.Types.ObjectId,
        ref: orderSchema,
    }]
})

// represent a collection called Storage by MongoDB
const Landlord = mongoose.model('landlord', landlordSchema);

//Export it
module.exports = Landlord;

