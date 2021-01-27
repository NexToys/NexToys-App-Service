const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const imageFilter = require('../helper/imageFilter');
const uploadTPic = imageFilter.uploadTPic;

//model
const Toy = require('../model/toy');
const Image = require('../model/image');

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
router.post('/register/pic', async(req,res) => {
    const response = uploadTPic.single('image');

    response(req,res,(err) => {
        if (req.fileValidationError) {
            return res.status(201); //File Validation Error
        }
        else if (!req.file) {
            return res.status(202); //No File
        }
        else if (err) {
            return res.status(203);
        }

        res.status(200).json({path: req.file.path});
    });


    /* uploadTPic.single('image').then(() => {
        const image = req.files.image;
        console.log(image.destination + "/" + image.filename);
    }).catch((err) => {
        console.log(err);
    }); */
})

router.post('/register', async(req,res) => {
    const toy = new Toy({
        _id: new mongoose.Types.ObjectId(),
        isActive: req.body.isActive,
        name: req.body.name,
        description: req.body.description,
        type:req.body.type,
        imageids: "600f2dba75a5a3290c35081c",
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
    const promise = Toy.findByIdAndUpdate(req.body._id,req.body,{new: true});

    promise.then((data) => {
        res.json(data);
    }).catch((err) => { 
        res.json(err);
    });
});

//delete
router.delete('/delete', async(req,res) => {
    const promise = Toy.findByIdAndRemove(req.body._id);

    promise.then(()=>{
        res.json(true);
    }).catch((err) => {
        res.json(err);
    });
});

module.exports = router;