const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const landlordSchema = require("./landlord");
const leaserSchema = require("./leaser");


const userSchema = new Schema({
    googleid: String,
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
});

const User = mongoose.model('user', userSchema);

module.exports = User;
