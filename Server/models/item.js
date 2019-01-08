const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ItemSchema = new Schema({
    landlord: {
        type: Schema.Types.ObjectId,
        ref: 'landlord'
    },
    name: {
        type: String,
        required: [true, 'Name field required.']
    },
    description: {
        type: String,
        required: [true, 'Description field required.']
    },
    dimensions:[{
        height: Number,
        width: Number,
        lendgth: Number,
    }],
    
    weight: Number,
    handling: [{
        ifStackble: Boolean,
        fragile: Boolean,
        dry: Boolean,
        temptrature: Number,
    }],
 
});


const Item = mongoose.model('item', ItemSchema);

module.exports = Item;