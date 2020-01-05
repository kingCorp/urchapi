const mongoose = require('mongoose');

mongoose.Promise = global.Promise
var mongodbUri ='mongodb://ds153947.mlab.com:53947/urch';

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  auth: {
    user: 'james',
    password: 'password1'
  }
})
var conn = mongoose.connection;    
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', () =>{
 console.log('connected to a database')                       
});

