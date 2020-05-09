const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;                   
const ExtarctJWT = require('passport-jwt').ExtractJwt;                  //help in extract JWT from the header
const Doctor = require('../models/doctor');

let opts = {
    jwtFromRequest:ExtarctJWT.fromAuthHeaderAsBearerToken(),  //method creates a new extractor that looks for the JWT in the authorization header with the scheme 'bearer'.
    secretOrKey : "covid19"                                 //using this key we're decrypting the header as it is used to encrypt it in doctors_api (line 21)
}

//This is used for Authenticate the user(doctor)
// Doctor is present already in JWT, we're just fetching out the id from the payload and checking if user(doctor) there or not(for every session)
passport.use(new JWTStrategy(opts,function(jwtPayload,done){
    Doctor.findById(jwtPayload._id,function(err,doctor){
        if(err){
            console.log('Error in finding user from JWT',err);
            return;
        }

        if(doctor){
            return done(null,doctor);
        }else{
            return done(null,false);
        }
    });
}));


module.exports = passport;