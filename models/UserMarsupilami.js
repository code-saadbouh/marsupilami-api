const mongoose = require('mongoose');

const userMarsupilami = new mongoose.Schema({
    username:{
        type : String, 
        require: true, 
        min: 6, 
        max: 255
    },
    email:{
        type : String, 
        require: true, 
        min: 6, 
        max: 255
    },
    password:{
        type : String, 
        require: true,
        max: 1024, 
        min: 6
    },
    date:{
        type: Date,  
        default: Date.now()
    }
});

module.exports = mongoose.model('userMarsupilami', userMarsupilami);