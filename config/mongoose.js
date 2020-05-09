//Mongoose configuration File for the creating the database and connect to it.

const mongoose = require('mongoose');

//connect to the database
mongoose.connect('mongodb://localhost/Hospital_API',{useNewUrlParser:true});

//check connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));
db.once('open', function(){
    console.log('Connected to Database :: MongoDB');
});


module.exports = db;