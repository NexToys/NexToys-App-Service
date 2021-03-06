// Include modules
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

// Include Routers
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const toyRouter = require('./routes/toy');

const app = express();

//config
const config = require('./config');
app.set('api_secret_key',config.api_secret_key);

//helper
const verifyToken= require('./helper/verify-token');
const db = require('./helper/db')();

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Use Routers
app.use('/', indexRouter);
app.use('/api/user', userRouter);
app.use('/api/toy', toyRouter);

app.listen('3000',()=>{
    console.log('localhost:3000');
});
module.exports = app;