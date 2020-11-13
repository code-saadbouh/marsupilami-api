const route = require('express').Router(); 
const UserMarsupilami = require('../models/UserMarsupilami'); 
const {registerValidation, loginValidation} = require('../validation'); 
const bcrypt = require('bcryptjs');
const { raw } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv/config'); 

//User Marsupilami Register

route.post('/register', async (req, res) => {
    //VALIDATE THE DATA BEFORE
    const{error} = registerValidation(req.body); 
    if (error) return res.status(400).send(error.details[0].message); 

    //checking if the user is already in the database
    const emailExist = await UserMarsupilami.findOne({email: req.body.email}); 
    if(emailExist) return res.status(400).send('Email Already exists'); 

    //Hash the passwords
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt); 

    //create new user
    const usermarsupilami = new UserMarsupilami({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    });
    try{
        const saveUser = await usermarsupilami.save();
        res.send(saveUser); 
    }catch(err){
        res.status(400).send(err); 
    }
}); 

//LOGIN
route.post('/login', async (req, res) => {
    //VALIDATE THE DATA BEFORE
    const{error} = loginValidation(req.body); 
    if (error) return res.status(400).send(error.details[0].message);
        //checking ifthe email exists
        const userMarsu = await UserMarsupilami.findOne({email: req.body.email}); 
        if(!userMarsu) 
        {
            return res.status(400).send('Email or password is wrong')
        }; 
        //PASSWORD IS CORRECT
        const validPass = await bcrypt.compare(req.body.password, userMarsu.password); 
        if(!validPass)
        {
            return res.status(400).send('Invalid password'); 
        };

        //Create and assign a token
        const token = jwt.sign({_id: userMarsu._id}, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send(token); 

        res.send('Welcome Marsupilami')

});


module.exports = route; 


