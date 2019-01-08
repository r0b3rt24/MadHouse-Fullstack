const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const leaser = require("./leaser");

const ItemSchema = new Schema({
  owner: {
    type: "leaser",
    required: [true, "Owner field required."]
  },
  name: {
    type: String,
    required: [true, "Name field required."]
  },
  description: {
    type: String,
    required: [true, "Description field required."]
  },
  dimensions: [
    {
      height: Number,
      width: Number,
      lendgth: Number
    }
  ],

  weight: Number,
  handling: [
    {
      ifStackble: Boolean,
      fragile: Boolean,
      dry: Boolean,
      temptrature: Number
    }
  ]
});

const Item = mongoose.model("item", ItemSchema);

module.exports = Item;
