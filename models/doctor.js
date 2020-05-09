// Collection for the Doctors
const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    username:{
        type:String,
        unique:true,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
},
{
    timestamps:true
});

const Doctor = mongoose.model('Doctor',doctorSchema);
module.exports = Doctor;

