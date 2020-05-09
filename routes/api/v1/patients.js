const express = require('express');
const router = express.Router();

const patientApi = require('../../../controllers/api/v1/patients_api');

router.post('/register',patientApi.register);


module.exports = router;