//Router for the reports 
const express = require('express');
const router = express.Router();

//include passport for authentication
const passport = require('passport');

const reportsApi = require('../../../controllers/api/v1/reports_api');

//Route for the fetching the reports by status
router.get('/:status',reportsApi.reportsByStatus);

module.exports = router;