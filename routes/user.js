const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//model
const User = require('../model/user');

//get
router.get('/', (req, res, next) => {
  const promise = User.find({});

  promise.then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

router.get('/', (req, res, next) => {
  const promise = User.findById(req.body._id);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => { 
    res.json(err);
  });
});

//post
router.post('/signin', (req, res, next) => {
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
          res.json({
            status: data,
            token
          });
        }      
      });
    });
  }  
});

router.post('/signup', (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      surname: req.body.surname,
      username: req.body.username,
      email: req.body.email,
      password: hash,
      bio: req.body.bio,
      pp_url: req.body.pp_url,
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
router.put('/update', (req, res, next) => {
  const promise = User.findByIdAndUpdate(req.body._id,req.body,{new: true});

  promise.then((data)=>{
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

//delete
router.delete('/delete', (req, res, next) => {
  const promise = User.findByIdAndRemove(req.body._id);

  promise.then((data)=>{
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;