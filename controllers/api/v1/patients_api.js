
//Api controller for the patient registration(everytime but if exist already return the patient info in the API)

const Patient = require('../../../models/patient');
const Report = require('../../../models/report');

module.exports.register = async function(req,res){
    try{
        let existPatient= await Patient.findOne({phoneno:req.body.phoneno});
            
        if(!existPatient){
            Patient.create(req.body,function(err,patient){
                if(err){
                    console.log('Error in registering the patient',err);
                    return;
                }
                return res.status(200).json({
                    patient:patient,
                    message:'Patient Registered'
                });
            });
        }else{
            return res.status(200).json({
                patient:patient,
                message:'Patient already Exist'
            });
        }
    }catch(err){
        console.log('*****',err);
        return res.status(500).json({
            message:"Internal Server Error:registering patients"
        });
    }
}

//api controller for creating the reports
module.exports.createReport = async function(req,res){
    let patient = await Patient.findById(req.params.id);
    
    Report.create(req.body,function(err,report){
        if(err){
            console.log('Error in create the patient report!',err);
            return;
        }

        return res.status(200).json({
            report:report,
            message:'Report Created!'
        });
    });

}