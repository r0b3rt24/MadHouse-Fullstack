const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReuestSchema = new Schema({
    Time: {
        type: String,
        required: [true, 'Time field is required'],
    },
    UserID: {
        type: String,
        required: [true, 'UserID field is required'],
    },
    StorageID: {
        type: String,
        required: [true, 'StorageID field is required'],
    }
})