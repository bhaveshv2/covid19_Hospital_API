//Router for the reports 
const express = require('express');
const router = express.Router();

const reportsApi = require('../../../controllers/api/v1/reports_api');

//Route for the fetching the reports by status
router.get = ('/:status',reportsApi.reportsByStatus);

module.exports = router;