//import the databases and configuration files

const Doctor = require('../../../models/doctor');
const jwt = require('jsonwebtoken');            //jwt for the login


//Creation of doctor profile if dosen't exist in db
module.exports.create = async function(req,res){
    try{
        //check if the password and confirm password are same or not
        if (req.body.password != req.body.confirm_password){
            return res.status(400).json({
                message:'Password and Confirm Password are not matching',
            });
        }
        //find the doctor 
        Doctor.findOne({username: req.body.username}, function(err, doctor){
            if(err){console.log('error in finding user(doctor) in signing up'); return;}

            //if not exist then create a new doctor user
            if (!doctor){
                Doctor.create(req.body, function(err, doctor){
                    if(err){console.log('error in creating user(doctor) while signing up'); return;}

                    return res.status(200).json({
                        doctor:doctor,
                        message:"Doctor registration successful!"
                    });
                });
            }else{
                return res.status(400).json({
                    message:'Doctor already exists!'
                })
            }
        });
    }catch(err){
        console.log('*****',err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}

module.exports.createSession = async function(req, res){

    //Whenever username and password received, we need to find that user and generate the jwt
    try{
        let doctor = await Doctor.findOne({username:req.body.username});
        if(!doctor || doctor.password!=req.body.password){
            return req.status(422).json({
                message:"Invalid username or password"
            });
        }

        return res.status(200).json({
            message:"Sign in successful,here is the token,please keeep it safe!",
            data:{
                //will set the token and send it to the user(doctor).
                token:jwt.sign(doctor.toJSON(),'covid19',{expiresIn:100000}),          
            }
        });
    }catch(err){
        console.log('*****',err);
        return res.status(500).json({
            message:"Internal Server Error"
        });
    }
}