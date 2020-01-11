const express = require('express');
const router = express.Router();

const checkAuth = require('../middleware/checkAuth')
const User = require('../controllers/user');

//routes

//sign up
router.post('/signup', User.signup);
//sign in
router.post('/signin', User.signin);
//profile
router.get('/:id', checkAuth, User.profile);


module.exports = router;