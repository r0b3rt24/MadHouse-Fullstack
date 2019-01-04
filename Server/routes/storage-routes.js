const express = require('express');
const router = express.Router();
const Storage = require("../models/storage");


// get storages from db
router.get('/storages',(req,res)=>{
    Storage.find({}).then((storage)=>{res.send(storage)}); // return all the storages 

    // Get storages according to the geo location
    // Storage.geoNear(
    //     {type: 'Point',coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]},
    //     {maxDistance: 100000, spherical:true}
    //     ).then((storages)=>{
    //         res.send(storages)
    //     })
})

// add a new storages to the db
router.post('/storages',(req,res,next)=>{
    Storage.create(req.body).then((storage)=>{
        res.send(storage);
    }).catch(next);

})

// update a storages already in the db
router.put('/storages/:id',(req,res,next)=>{
    Storage.findByIdAndUpdate({_id: req.param.id}, req.body).then(()=>{
        Storage.findOne({_id: req.param.id}).then(()=>res.send(storage))
    })
})

// Delete a storages from the db
router.delete('/storages/:id',(req,res,next)=>{
    Storage.findByIdAndRemove({_id: req.params.id}).then((storage)=>{
        res.send(storage);
    });
})

// make other file can import this file
module.exports = router;