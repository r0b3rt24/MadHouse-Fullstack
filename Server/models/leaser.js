const mongoose = require("mongoose")
const Schema = mongoose.Schema;

/*
{
    username: 'Dang',
    id: '1ds1fs7sdfnas',
    orders: [ // list of order id
      '123eef44c23','123eaa3bb300',
    ],
    favorites: [ // List of assets
        '123eef44c23','123eaa3bb300',
    ], 
  }
*/


const leaserSchema = new Schema({
    username: String,
    id: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;
