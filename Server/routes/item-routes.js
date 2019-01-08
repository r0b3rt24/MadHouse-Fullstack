const express = require('express');
const router = express.Router();
const Item = require("../models/item");

// get all item from db
router.get('/allItems',(req,res)=>{
    Item.find({}).then((item)=>{res.send(item)}); // return all the storages 
})

// get one item already in the db
router.get('/oneitem/:id',(req,res,next)=>{
    Item.findOne({_id: req.param.id}).then((item)=>res.send(item))
})

// add a new item to the db
router.post('/item',(req,res,next)=>{
    Item.create(req.body).then((item)=>{
        res.send(item);
    }).catch(next);

})

// update a item already in the db
router.put('/oneitem/:id',(req,res,next)=>{
    Item.findByIdAndUpdate({_id: req.param.id}, req.body).then(()=>{
        Item.findOne({_id: req.param.id}).then(()=>res.send(item))
    })
})

// Delete a item from the db
router.delete('/deleteItem/:id',(req,res,next)=>{
    Item.findByIdAndRemove({_id: req.params.id}).then((item)=>{
        res.send(item);
    });
})

// make other file can import this file
module.exports = router;