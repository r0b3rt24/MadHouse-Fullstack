const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ContactSchema = new Schema({
    phone: Number,
    email: {
        type: String,
        required: [true, 'Name field is required'],
    },
    mail: String,
})

const DetailSchema = new Schema({
    description: {
        type: String,
    },
    picture: {
        type: String,
    }
})

// create geolocation Schema
const GeoSchema = new Schema({
    type: {
        type: String,
        'default': 'Point'
    },
    coordinates: {
        type: [Number],
        index: "2dsphere"
    }
})

//creates Storage Schema & model
const StorageSchema = new Schema({
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
    detail: DetailSchema,
    price: {
        type: Number,
        required: [true, 'Price field is required']
    },
    available: {
        type: Boolean,
        default: false,
    },
    geometry: GeoSchema

})

// represent a collection called Storage by MongoDB
const Storage = mongoose.model('storage', StorageSchema);

//Export it
module.exports = Storage;

