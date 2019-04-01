const mongoose = require("mongoose")
const Schema = mongoose.Schema;
import { isEmail } from 'validator'; // verify email
import { isInt } from 'validator'; // verify phone number
import { isAlpha } from 'validator'; // verify names

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
        validate: [ isAlpha, 'invalid name' ]
    },
    lastname: {
        type: String, 
        required: true,
        validate: [ isAlpha, 'invalid name' ]
    },
    registerdate: {
        type: Date,
        default: Date.now
    },
    phone: {
        type: String, 
        required: true,
        validate: [ isInt, 'invalid phone number' ]
    },
    email: {
        type: String, 
        required: true,
        validate: [ isEmail, 'invalid email' ]
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
