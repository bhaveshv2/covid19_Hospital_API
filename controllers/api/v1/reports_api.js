//Reports collection
const Report = require('../../../models/report');

//Controller for fetching the reports by given status
module.exports.reportsByStatus = async function(req,res){
    try{
        let reports = await Report.find({status:req.params.status},'doctor patient status date')
        .populate({
            path:'doctor',
        })
        .populate({
            path:'patient'
        });

        return res.status(200).json({
            message:'Reports with the status : '+req.params.status,
            reports:reports
        });
    }catch(err){
        return res.status(500).json({
            message: "Internal Server Error:Fetch reports by status"
        });
    }
}