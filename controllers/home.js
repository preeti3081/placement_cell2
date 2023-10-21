const User = require('../model/user');
const passport = require('passport');

module.exports.home = async function(req,res){
    
    try{
        const user = await User.findById(req.user.id);
        console.log(user);
        if(user){
            return res.render('home',{
                title:"Student details",
                user: user
            });
        }
    }catch(err){
        console.log(err);
        return res.redirect('/user/sign-in');
    }
    return res.redirect('/user/sign-in'); 
}


//render sign up page
module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/');
    }
    return res.render('user_sign_up',{
        title : "Placement Cell | Sign Up"
    })
}

//render sign in page
module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/user/');
    }
    return res.render('user_sign_in',{
        title : "Placement Cell | Sign In"
    })
}

module.exports.create = async function (req, res) {
    try {
        if (req.body.password !== req.body.confirm_password) {
            return res.redirect('back');
        }
        // Try to find if the email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            console.log('User already exists');
            return res.redirect('back');
        }

        // Create a new user
        const newUser = await User.create(req.body);
        console.log('User created successfully');
        // After creating the user and setting the cookie
        console.log('New User ID:', newUser._id);
        console.log('user_id Cookie Value:', req.cookies.user_id);


        // Set the user_id cookie with the newly created user's _id
        res.cookie('user_id', newUser._id, { maxAge: 3600000 }); // You can set an expiration time if needed

        return res.redirect('/user/sign-in');
    } catch (err) {
        console.log('Error in finding user or signing up', err);
        return res.redirect('back');
    }
}

module.exports.createSession = function (req, res) {
    // Assuming that your Passport authentication was successful, you can set the user's session.
    req.login(req.user, function (err) {
        if (err) {
            console.log('Error setting user session:', err);
            return res.redirect('back');
        }
        return res.redirect('/user/');
    });
}


module.exports.destroySession = function(req, res) {
    req.logout(function(err) {
        if (err) {
            // Handle any logout-related errors
            console.error('Error during logout:', err);
        }
        // Redirect or perform other actions after the user is logged out
        res.redirect('/user/sign-in'); // Redirect to the homepage or any other desired location
    });
}
