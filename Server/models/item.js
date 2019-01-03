const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const leaser = require('./leaser');


const ItemSchema = new Schema({
    /* Item */

    owner: {
        type: LeaserSchema,
        required: [true, 'Owner field required.']
    },
    name: {
        type: String,
        required: [true, 'Name field required.']
    },
    description: {
        type: String,
        required: [true, 'Description field required.']
    },
    dimensions:{
        type:[Number], // width, height, depth
        required: [true, 'Dimensions required.']
    },
    weight: Number,
    handling: {
        type: HandleSchema,
        required: [true, 'Handling info required.']
    },
 
});

const HandleSchema = new Schema({
    ifStackble: {
        type: Boolean,
        required: [true, 'Specify whether item is stackable.']
    }, 
    fragile: Boolean,
    dry: Boolean,
    temptrature: Number,

});

const Item = mongoose.model('item', ItemSchema);

module.exports = Item;