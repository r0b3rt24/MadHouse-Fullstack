const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required'],
    },
    address: {
        type: String,
        required: [true, 'Address field is required'],
    },
    contact: {
        type: ContactSchema,
        required: [true, 'Address field is required'],
    },
})