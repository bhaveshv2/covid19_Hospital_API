
//The main server File

const express = require('express');
const app = express();
const port = 8000;
const db = require('./config/mongoose');
const passport = require('passport');
const passportJwt = require('./config/passport-jwt-strategy');     //JWT configuration file
const bodyParser = require('body-parser');
const config = require('config');
const morgan = require('morgan');

//don't show the log when it is test
if(config.util.getEnv('NODE_ENV') !== 'test') {
	//use morgan to log at command line
	app.use(morgan('combined')); //'combined' outputs the Apache style LOGs
}

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));

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

//For testing purpose we're exporting the server
module.exports = app;