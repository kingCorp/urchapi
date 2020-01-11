const mongoose = require('mongoose');

const Category = require('../models/category');

//create products
exports.create = (req, res, next) => {
  var product = new Category({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
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
      error: err
    });
  });

}

//get categories
exports.fetch_all = (req, res, next) => {
  Category.find().exec().then(
    result => {
      console.log(result);
      res.status(200).json({
        message: "All categories",
        details: result,
      })
    }).catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  })

}


