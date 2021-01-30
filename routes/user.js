const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');
const isVerified = require('../helper/verify-token');

//get
router.get('/', async (req, res) => {
  await User.find({}).then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

router.get('/', async(req, res) => {
  await User.findById(req.body._id).then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

//post
router.post('/signin', async(req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  await User.findOne({email}).then((data) => {
    if(data && (bcrypt.compareSync(password,data.password))) {
      const payload = {
        email
      }
      const token = jwt.sign(payload, req.app.get('api_secret_key'),{
        expiresIn: 720
      });
      User.findByIdAndUpdate(data._id,{token:token});
      res.status(200).json(data);
    } else {    
      res.status(201).json({
      status: false,
      message: 'Authentication failed. Wrong E-mail or Password'
    });
  }
});
});

router.post('/signup', async(req, res) => {
  await bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash      
    });
    
    const promise = user.save();
    promise.then((data) => {
      res.status(200).json(data);
    }).catch((err) => { 
      res.status(201).json(err);
    });
  });
});

//put
router.put('/update',/* isVerified, */ async(req, res) => {
  await User.findByIdAndUpdate(req.body._id,req.body,{new: true}).then((data)=>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//delete
router.delete('/delete',/* isVerified, */ async(req, res) => {
  await User.findByIdAndRemove(req.body._id).then(()=>{
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;