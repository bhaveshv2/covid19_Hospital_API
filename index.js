
//The main server File

const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');     //JWT configuration file

//URL encorder method call 
app.use(express.urlencoded());

//Routers folder
app.use('/', require('./routes'));

//Server listner
app.listen(port, function(err){
    if (err){
        console.log(`Error in running the server: ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});