const express = require('express');
const router = express.Router();

const User = require('../controllers/user');

//routes

//sign up
router.post('/signup', User.signup);

//sign in
router.post('/signin', User.signin);


module.exports = router;