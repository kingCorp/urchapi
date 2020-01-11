const express = require('express');
const router = express.Router();

//middleware
const checkAuth = require('../middleware/checkAuth')

const Order = require('../controllers/order');
const Category = require('../controllers/category');

//create
router.post('/:id', checkAuth, Order.create);
//create
router.get('/', checkAuth, Order.fetch_orders);



module.exports = router;