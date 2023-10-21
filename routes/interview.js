const express = require('express');
const router = express.Router();
const passport = require('passport');

const interviewController = require('../controllers/interview');

//accessing home function to render interview page
router.get('/',passport.checkAuthentication,interviewController.home);

//post new interview created
router.post('/create',interviewController.create);

module.exports = router;