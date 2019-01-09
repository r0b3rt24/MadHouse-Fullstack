const express = require('express');
const router = express.Router();
const Order = require("../models/order");

// get all item from db
router.get('/allOrders',(req,res)=>{
    Order.find({}).then((order)=>{res.send(order)}); // return all the storages 
})

// get one order already in the db
router.get('/oneById/:id',(req,res,next)=>{
    Order.findOne({_id: req.param.id}).then((order)=>res.send(order))
})

// add a new order to the db
router.post('/order',(req,res,next)=>{
    Order.create(req.body).then((item)=>{
        res.send(item);
    }).catch(next);

})

// update a order already in the db
router.put('/order/:id',(req,res,next)=>{
    Order.findByIdAndUpdate({_id: req.param.id}, req.body).then(()=>{
        Order.findOne({_id: req.param.id}).then(()=>res.send(order))
    })
})

// Delete a item from the db
router.delete('/order/:id',(req,res,next)=>{
    Order.findByIdAndRemove({_id: req.params.id}).then((order)=>{
        res.send(order);
    });
})

// make other file can import this file
module.exports = router;