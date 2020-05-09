const express = require('express');
const router = express.Router();
const passport = require('passport');

const doctorApi = require('../../../controllers/api/v1/doctors_api');

router.post('/register',doctorApi.create);
router.post('/login',doctorApi.createSession);

module.exports = router;