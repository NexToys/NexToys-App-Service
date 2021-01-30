const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//model
const Toy = require('../model/toy');

//get
router.get('/', async(req, res) => {
    await Toy.find({isActive:true}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/byownerid', async(req,res) => {
    ownerid = req.body.owner_id;
    await Toy.find({ownerId:ownerid}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/bytoyid', async(req,res) => {
    id = req.body._id;
    await Toy.find({_id: id}).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json(err);
    });
});

//post
router.post('/register', async(req,res) => {
    const toy = new Toy({
        _id: new mongoose.Types.ObjectId(),
        isActive: req.body.isActive,
        name: req.body.name,
        description: req.body.description,
        type:req.body.type,
        imageurl: req.body.imageurl,
        ownerId: req.body.ownerId,
        createdAt: req.body.createdAt
    });
    const promise = toy.save();
    
    promise.then((data) => {
        res.json(data);
    }).catch((err) => { 
        res.json(err);
    });
});

//put
router.put('/update', async(req,res) =>{
    await Toy.findByIdAndUpdate(req.body._id,req.body,{new: true}).then((data) => {
        res.json(data);
    }).catch((err) => { 
        res.json(err);
    });
});

//delete
router.delete('/delete', async(req,res) => {
    await Toy.findByIdAndRemove(req.body._id).then(()=>{
        res.json(true);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;