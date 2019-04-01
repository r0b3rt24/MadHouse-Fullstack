const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const validator = require("validator");

/*
 Add validators to the model
*/

const userSchema = new Schema({
    landlord: {
        type: Schema.Types.ObjectId,
        ref: "landlord"
        },
    leaser: {
        type: Schema.Types.ObjectId,
        ref: "leaser"
    },
    googleid: String,
    username: {
        type: String,
        required: [true, 'username field is required'],
        unique: true,
    },
    firstname: {
        type: String, 
        required: true,
        validate: [ validator.isAlpha, 'invalid name' ]
    },
    lastname: {
        type: String, 
        required: true,
        validate: [ validator.isAlpha, 'invalid name' ]
    },
    registerdate: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String, 
        required: true,
        validate: [ validator.isInt, 'invalid phone number' ]
    },
    email: {
        type: String, 
        required: true,
        validate: [ validator.isEmail, 'invalid email' ]
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
