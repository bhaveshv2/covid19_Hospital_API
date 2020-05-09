//Import files for router
const express = require('express');
const router = express.Router();

//controller for the routes
const patientApi = require('../../../controllers/api/v1/patients_api');

router.post('/register',patientApi.register);
router.get('/:id/create_report',patientApi.createReport);
router.get('/:id/all_reports',patientApi.allReports);

module.exports = router;