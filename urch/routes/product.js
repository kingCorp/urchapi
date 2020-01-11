const express = require('express');
const router = express.Router();

//middleware
const checkAuth = require('../middleware/checkAuth')

const Product = require('../controllers/product');
const Category = require('../controllers/category');

//routes

//create
router.post('/', Product.create);
//create
router.get('/', Product.fetch_all);
//create
router.delete('/:id', Product.product_delete);
//fetch by category
router.get('/:id/category', checkAuth, Product.fetch_by_category);
//fetch product details
router.get('/:id', checkAuth, Product.product_details);





//create category
router.post('/category', Category.create);
//fetch all category
router.get('/category', Category.fetch_all);

module.exports = router;