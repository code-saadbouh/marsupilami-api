const express = require('express'); 
const mongoose = require('mongoose');
const Marsupilami = require('../models/Marsupilami'); 
const route = express.Router();
const verifyConnection = require('./verifyToken'); 


//CREATE MARSUPILAMI
route.post('/AddMarsupilami',verifyConnection, async(req,res)=>{
    const{name, family, food, race, age} = req.body; 
    let marsupilami = {};
    marsupilami.name = name; 
    marsupilami.family = family; 
    marsupilami.food = food;
    marsupilami.race = race;
    marsupilami.age = age; 
    let marsupilamiModel = new Marsupilami(marsupilami);
    try{
        await marsupilamiModel.save();
        res.json(marsupilamiModel);
    }catch(err){
        res.json({message : err})
    }
});

//GET BACK ALL MARSUPILAMI
route.get('/showMarsupilami',verifyConnection, async (rep, res) => {
    try {
        const marsupilamifriends = await Marsupilami.find(); 
        res.json(marsupilamifriends); 
    } catch (err) {
        res.json({message : err});
    }
});

//GET ONE MARSUPILAMI BY ID
route.get('/getOneMarsu/:marsupilamiId',verifyConnection, async(req, res) =>{
    try {
    const marsupilamifind = await Marsupilami.findById(req.params.marsupilamiId);
    res.json(marsupilamifind);
    } catch (err) {
        res.json({message : err});
    }
});

//UPDATE MARSUPILAMI
route.put('/updateMarsu/:UpdateMarsupilami',verifyConnection, (req, res, next) => {
    const marsupilamiUpdate = new Marsupilami({
      _id: req.params.UpdateMarsupilami,
      name: req.body.name,
      family: req.body.family,
      race: req.body.race,
      food: req.body.food,
      age: req.body.age
    });
    Marsupilami.updateOne({_id: req.params.UpdateMarsupilami}, marsupilamiUpdate).then(
      () => {
        res.status(201).json({
          message: 'Marsupilami updated successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  });

//DELETE MASRUPILAMI
route.delete('/deleteMarsu/:marsupilamiId',verifyConnection, async(req, res) =>{
    try {
        const  removeMarsupilami =  await Marsupilami.remove({_id: req.params.marsupilamiId});
        res.json(removeMarsupilami); 
    } catch (err) {
        res.json({message : err});
    }

});

module.exports = route; 