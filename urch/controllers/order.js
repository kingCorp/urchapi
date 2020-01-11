const mongoose = require('mongoose');

const Order = require('../models/order');
const Product = require('../models/product');
const User = require('../models/user');

exports.create = (req, res, next) => {
    var userId = req.userData.userId; 
    Product.findById(req.params.id)
    .exec()
    .then(doc => {
        var data = {
            _id: new mongoose.Types.ObjectId(),
            userId: userId,
            productId: doc._id,
            address: req.body.address,
            quantity: req.body.quantity
        }
         var order = new Order(data);

         order.save().then(result => {
            console.log(result);
            res.status(200).json({
              message: "order created successfully",
              details: result,
            })
         }).catch(err => {
            console.log(err)
            res.status(500).json({
              error: err,
              message: 'Could not save'
            });
          });
    })
    .catch(err => {
      res.status(409).json({
          message: 'User doesnt exist',
          err
        })
    })
}


//get products
exports.fetch_orders = (req, res, next) => {
    var userId = req.userData.userId; 
    Order.find({userId: userId}).populate('categories').populate('productId').exec().then(
      result => {
        console.log(result);
        res.status(200).json({
          code: "201",
          message: "All orders",
          data: result,
        })
      }).catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    })
  }