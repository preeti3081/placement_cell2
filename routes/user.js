const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/home');

router.get('/',passport.checkAuthentication,userController.home);
router.get('/sign-in',userController.signIn);
router.get('/sign-up',userController.signUp);

router.post('/create',userController.create);
//router.post('/create-session',userController.createSession);

//use passport as a middleware to authenticate
router.post('/create-session',passport.authenticate(
    'local',
    {failureRedirect: '/user/sign-in'},
),userController.createSession);
router.get('/sign-out',userController.destroySession);

module.exports = router;