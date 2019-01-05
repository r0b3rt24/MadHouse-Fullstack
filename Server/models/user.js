const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const landlordSchema = require("./landlord");
// const leaserSchema = require("./leaser");


const userSchema = new Schema({
    // landlord: {
    //     type: Schema.Types.ObjectId,
    //     ref: landlordSchema
    // },
    // leaser: {
    //     type: Schema.Types.ObjectId,
    //     ref: leaserSchema
    // },
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
