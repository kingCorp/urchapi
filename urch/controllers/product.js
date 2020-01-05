const mongoose = require('mongoose');

const Category = require('../models/category');
const Product = require('../models/product');

//create products
exports.create = (req, res, next) => {
  Category.findById(req.body.categoryId).exec().then( doc => {
      if (doc !== null) {
        var product = new Product({
          _id: new mongoose.Types.ObjectId(),
          title: req.body.title,
          description: req.body.description,
          price: req.body.price,
          quantity: req.body.quantity,
          categories: doc._id,
          images: req.body.image
        })
      
        product.save().then(result => {
          console.log(result);
          res.status(200).json({
            message: "product saved successfully",
            details: result,
          })
        }).catch(err => {
          console.log(err)
          res.status(500).json({
            error: err,
            message: 'Could not save'
          });
        });
      } else {
        res.status(200).json({
          message: "category ID doesnt exist or has been deleted"
        });
      }
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
  
}

//get products
exports.fetch_all = (req, res, next) => {
  Product.find().populate('categories').exec().then(
    result => {
      console.log(result);
      res.status(200).json({
        message: "All products",
        details: result,
      })
    }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })

  // Product.find().populate('categories').exec().then(doc => {
  //   console.log(doc);
  //   res.status(200).json({doc});
  // }).catch(err => {
  //   console.log(err)
  //   res.status(500).json({
  //     error: err
  //   });
  // })

}
