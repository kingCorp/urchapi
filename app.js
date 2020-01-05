const express = require('express');
const morgan = require('morgan');    
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

//import routes
const products = require('./urch/routes/product')
const users = require('./urch/routes/user')

//db connect
require('./urch/middleware/db');

//logs the server
app.use(morgan('dev'));
//parse url and json request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



//allow cross origin 
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        Response.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({})
    }
    next();
});


//middleware routes handling requests
app.use('/api/v1/products', products);
app.use('/api/v1/users', users);


//handling errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })

})

module.exports = app;