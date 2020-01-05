const express = require('express');
const router = express.Router();

const Product = require('../controllers/product');
const Category = require('../controllers/category');

//routes

//create
router.post('/', Product.create);
//create
router.get('/', Product.fetch_all);






//create category
router.post('/category', Category.create);
//fetch all category
router.get('/category', Category.fetch_all);

module.exports = router;