const mongoose = require('mongoose');
const Schema = mongoose.Schema;
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
    registerdate: Date,
    phone: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: true,
    }
    

})

// represent a collection called Storage by MongoDB
const landlord = mongoose.model('storage', StorageSchema);

//Export it
module.exports = landlord;

