const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/* 
{
  username: 'Dog',
  id: '1ds1fs7sdfnas',
  password: '********', // encrypted 
  lastName: 'Wang',
  firstName: 'Donglin',
  assets: [ // array asset id
    "1dewr7sad8ads", "a6s7d8sa68d7sa",
  ],
  orders: [ // array of order id
    "1dewr7sad8ads", "a6s7d8sa68d7sa",
  ],
  registerdate: date,
  phone: "6084403075",
  email: "hcao29@wisc.edu",
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

