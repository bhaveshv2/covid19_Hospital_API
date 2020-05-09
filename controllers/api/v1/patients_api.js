
//Api controller for the patient registration(everytime but if exist already return the patient info in the API)

//models used
const Patient = require('../../../models/patient');
const Doctor = require('../../../models/doctor');
const Report = require('../../../models/report');

//Registration of patients
module.exports.register = async function(req,res){
    try{
        let existPatient= await Patient.findOne({phoneno:req.body.phoneno});
        
        //if Patient dosen't exist in the db then register it
        if(!existPatient){
            await Patient.create(req.body,function(err,patient){
                if(err){
                    console.log('Error in registering the patient',err);
                    return;
                }
                return res.status(200).json({
                    patient:patient,
                    message:'Patient Registered!'
                });
            });
        }else{
            return res.status(200).json({
                message:'Patient already Exist! Details:',
                patient:existPatient                
            });
        }
    }catch(err){
        console.log('*****',err);
        return res.status(500).json({
            message:"Internal Server Error:registering patients"
        });
    }
}

//api controller for creating the new reports
module.exports.createReport = async function(req,res){
    try{
        let patient = await Patient.findById(req.params.id);
        let doctor = await Doctor.findById(req.user.id);

        if(patient && doctor){
            let status=req.body.status;
            let date = req.body.date;

            let report = await Report.create({
                doctor:doctor._id,
                patient:req.params.id,
                status:status,
                date:date
            });

            patient.reports.push(report._id);
            patient.save();

            return res.status(200).json({
                message:'Report created!',
                report:report
            });
        }else{
            return res.status(401).json({
                message:'Invalid Details!'
            });
        }
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error:creating report"
        });
    }
}

//Controller for fetching the all the reports of the patient
module.exports.allReports = async function(req,res){
    try{
        let reports = await Patient.findById(req.params.id)
        .sort('-createdAt')
        .populate({
            path:'reports',
            select:'doctor status date'
        });

        //responding json format of reports
        return res.status(200).json({
            patientMobile:reports.phoneno,
            message:'All reports of'+reports.phoneno,
            reports:reports.reports
        })
    }catch(err){
        return res.status(500).json({
            message:'Internal Sever Error:Fetching all reports',
        });
    }
}