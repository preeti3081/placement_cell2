const express = require('express');
const router = express.Router();
const passport = require('passport');

const studentController = require('../controllers/student');

//accessing home function to render student page
router.get('/',passport.checkAuthentication,studentController.home);

//posting new student created
router.post('/create',studentController.create);

//download function for downloading entire data on student page
router.get('/download-csv',studentController.downloadCsv);


module.exports = router;