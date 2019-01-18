const mongoose = require("mongoose")
const Schema = mongoose.Schema;

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
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;
