
//Routers for the others router like doctors,patients and reports

const express = require('express');
const router = express.Router();

//include passport for authentication
const passport = require('passport');

router.use('/doctors',require('./doctors'));
router.use('/patients',passport.authenticate('jwt', {session:false}),require('./patients'));
router.use('/reports',passport.authenticate('jwt', {session:false}),require('./reports'));

module.exports = router;