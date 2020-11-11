const route = require('express').Router(); 
const UserMarsupilami = require('../models/UserMarsupilami'); 
const {registerValidation} = require('../validation'); 


route.post('/register', async (req, res) => {

    //VALIDATE THE DATA BEFORE
    const{error} = registerValidation(req.body); 
    if (error) return res.status(400).send(error.details[0].message); 

    const usermarsupilami = new UserMarsupilami({
        username: req.body.username,
        email: req.body.email, 
        password: req.body.password
    });
    try{
        const saveUser = await usermarsupilami.save();
        res.send(saveUser); 
    }catch(err){
        res.status(400).send(err); 
    }
}); 


module.exports = route; 


