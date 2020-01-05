const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require("crypto");
const jwt = require('jsonwebtoken');
const User = require('../models/user');

//user sign up
exports.signup = (req, res, next) => {
  User.find({
      email: req.body.email
    }).exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(401).json({
          message: 'Email already exist'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            console.log(err)
            res.status(500).json({
              error: err
            })
          } else {
            const code = crypto.randomBytes(20).toString('hex');
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash,
              name: req.body.name,
              phone: req.body.phone,
              address: req.body.address,
              verify: code
            });

            user.save().then(result => {
              const token = jwt.sign({
                  email: result.email,
                  userId: result._id
                },
                "secret", {
                  expiresIn: "1h"
                }
              );
              res.status(200).json({
                message: 'User created successfully',
                details: result,
                token: token,
                userId: result._id,
              })
            }).catch(err => {
              console.log(err)
              res.status(500).json({
                error: err,
                message: 'Could not save'
              });
            });
          }
        })
      }
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({
        error: err
      });
    })
}


exports.signin = (req, res, next) => {
  User.find({
    email: req.body.email
  }).exec().then(user => {
    if (user.length > 1) {
        return res.status(402).json({
          message: 'Authentication failed 2'
        })
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(402).json({
            message: 'Authentication failed 3',
            error: err
          })
        }
        if (result) {
          const token = jwt.sign({
              email: user[0].email,
              userId: user[0]._id
            },
            "secret", {
              expiresIn: "1h"
            }
          );

          return res.status(200).json({
            message: 'Authentication Successful',
            details: user,
            token: token,
          })
        }
        return res.status(402).json({
          message: 'Invalid email or password'
        })
      })
  }).catch(err => {
      console.log(err)
      res.status(402).json({
        error: err,
        message: 'Authentication failed 4',
      })
    })
}
