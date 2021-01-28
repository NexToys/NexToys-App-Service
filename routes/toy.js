const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//model
const Toy = require('../model/toy');

//get
router.get('/', async(req, res) => {
    Toy.aggregate(
    ).lookup({
        from: 'users',
        localField: 'ownerId',
        foreignField: '_id',
        as: 'owner'
    }).unwind('$owner').then((data) => {
        res.json({message: "Oyuncaklar başarıyla çağırıldı!",
        data });
    }).catch((err) => {
        res.json(err);
    });
});

router.get('/byownerid', async(req,res) => {
        ownerid = req.body.owner_id||req.query.owner_id||req.header.owner_id;
        Toy.aggregate(
        ).match(
            {
                ownerId:mongoose.Types.ObjectId(ownerid)
            }
        ).lookup({
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'owner'
        }).unwind('$owner').then((data) => {
            res.json({message: ownerid + " Idli kullanıcının oyuncak bilgileri başarıyla getirildi!",
                data});
        }).catch((err) => {
            res.json(err);
        });
});

router.get('/bytoyid', async(req,res) => {
    id = req.body._id||req.query._id||req.header._id;
    Toy.aggregate(
        ).match(
            {
                _id:mongoose.Types.ObjectId(id)
            }
        ).lookup({
            from: 'users',
            localField: 'ownerId',
            foreignField: '_id',
            as: 'owner'
        }).unwind('$owner').then((data) => {
            res.json({message: id + " Idli oyuncağın bilgileri başarıyla getirildi!",
            data});
        }).catch((err) => {
            res.json(err);
        });
});

<<<<<<< Updated upstream
//post
router.post('/register',async(req,res) => {
=======
router.post('/register', async(req,res) => {
>>>>>>> Stashed changes
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
        res.json({message: "Oyuncak kaydı başarıyla yapıldı!",
        data});
    }).catch((err) => { 
        res.json(err);
    });
});

//put
router.put('/update', async(req,res) =>{
    const promise = Toy.findByIdAndUpdate(req.body._id,req.body,{new: true});

    promise.then((data) => {
        res.json({message: "Oyuncak bilgiler başarıyla güncellendi!",
        data});
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