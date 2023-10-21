const express = require('express');
const router = express.Router();

//for home or user page
router.use('/user',require('./user'));

//for interview page
router.use('/interview',require('./interview'));

//for student page
router.use('/student',require('./student'));

module.exports = router;