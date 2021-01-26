const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');
const isVerified = require('../helper/verify-token');

//get
router.get('/',isVerified, (req, res) => {
  const promise = User.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

router.get('/',isVerified, async(req, res) => {
  const promise = User.findById(req.body._id);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

//post
router.post('/signin', async(req, res) => {
  var {loginname,password} = req.body;
  const promise = User.findOne(loginname.includes('@') ? {email: loginname} : {username: loginname});
  
  if(!promise)
  {
    res.json({
      status: false,
      message: 'Authentication failed. Wrong Username'
    })
  }else {
    promise.then((data) => {
      bcrypt.compare(password,data.password).then((data) => {
        if(!data)
        {
          res.json({
            status: false,
            message: 'Authentication failed. Wrong Password'
          });
        }else{
          const payload = {
            loginname
          }
          const token = jwt.sign(payload, req.app.get('api_secret_key'),{
            expiresIn: 720
          });
          User.findByIdAndUpdate(promise._id,{token:token})
          res.json({
            status: data,
            token: token
          });
        }      
      });
    });
  }  
});

router.post('/signup', async(req, res) => {
  await bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      bio: req.body.bio,
      imageids: req.body.pp_url,
      rating: req.body.rating,
      createdAt: req.body.createdAt
    });
    
    const promise = user.save();
    promise.then((data) => {
      res.json(data);
    }).catch((err) => { 
      res.json(err);
    });
  });
});

//put
router.put('/update',isVerified, async(req, res) => {
  const promise = User.findByIdAndUpdate(req.body._id,req.body,{new: true});

  promise.then((data)=>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//delete
router.delete('/delete',isVerified, async(req, res) => {
  const promise = User.findByIdAndRemove(req.body._id);

  promise.then(()=>{
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;