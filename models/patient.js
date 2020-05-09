//Collection for the data of Patients

const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    phoneno:{
        type:Number,
        required:true,
        unique:true,
    },
    report:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Report',
        }
    ]
},{
    timestamps:true,
});

const Patient = mongoose.model('Patient',patientSchema);
module.exports = Patient;