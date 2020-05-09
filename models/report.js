//Collection of all the reports 
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    //storing the doctors id only
    doctor:[
        {
            type:mongoose.Schema.ObjectId,
            ref:'Doctor'
        }
    ],
    date:{
        type:Date
    },
    status:{
        type:String,
        required:true,
        emun:['Negative','Travelled-Quarantine','Symptoms-Quarantine','Positive']    //emun tells the value of 'status' can only be from these 4 values.
    }
},{
    timestamps:true,
});

const Report = mongoose.model('Report',reportSchema);
module.exports = Report;