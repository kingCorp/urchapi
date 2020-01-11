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
        code: "201",
        message: "All products",
        data: result,
      })
    }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })
}

//product info
exports.product_details = (req, res, next) => {
  const id = req.params.id
  console.log(req.userData);
  Product.findById(id).populate('categories')
    .exec()
    .then(doc => {
      if(doc == null){
        res.status(409).json({ message: 'product doesnt exist',})
      }
      res.status(200).json({
        message: 'product',
        data: doc
      });
    })
    .catch(err => {
      res.status(409).json(err)
    })
}

//get products in a category
exports.fetch_by_category = (req, res, next) => {
  Product.find({categories:req.params.id}).populate('categories').exec().then(doc => {
    console.log(doc);
    res.status(200).json({
      code: "201",
      message: "products by categories",
      data:doc
    });
  }).catch(err => {
    console.log(err)
    res.status(500).json({
      message: 'category doesnt exist',
      error: err
    });
  })
}


//delete user
exports.product_delete = (req, res, next) => {
  const id = req.params.id;
  Product.remove({
      _id: id
    })
    .exec()
    .then(result => {
      res.status(200).json({
        messgae: 'Product deleted',
        data: result
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    });
}