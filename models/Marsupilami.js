const mongoose = require('mongoose'); 

const marsupilami = new mongoose.Schema(
    {
    name : String, 
    family : String, 
    race : String,
    food : String, 
    age : Number,
    }, 
    { timestamps : true}
);
  module.exports = Marsupilami = mongoose.model('marsupilami', marsupilami); 