const mongoose = require('mongoose');
require('dotenv/config'); 

const connectDB = async() => {
    await mongoose.connect(process.env.BD_CONNECT,{
        useUnifiedTopology : true, 
        useNewUrlParser : true
    });
    console.log('Successful connection to the database  :-) !');
}

module.exports = connectDB;

