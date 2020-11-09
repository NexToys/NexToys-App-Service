const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');

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
  var {username,password} = req.body;
  const promise = User.findOne(username.includes('@') ? {email: username} : {username: username});
  
  promise.then((data) => {
    bcrypt.compare(password,data.password).then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    });
  }).catch((err) => {
    res.json(err);
  });
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
      createdAt: req.body.createdAt
    });
    const promise = user.save();
    upload.single('profile_pic');
    promise.then((data) => {
      res.json(data);
    }).catch((err) => { 
      res.json(err);
    });
  });
});

router.post('/uploadpic', (req, res ,next) => {
  const user = User.findById(req.body._id);
  user.profile_pic.data = req.body.profile_pic;
  user.profile_pic.contentType = 'image/jpg';
  user.save().catch((err) => {
    res.json(err);
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
  const promise = User.findByIdAndDelete(req.body._id);

  promise.then((data)=>{
    res.json(true);
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;