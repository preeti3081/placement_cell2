const express = require('express');
const port = 8000;
const app = express();
// const bodyParser = require('body-parser');
const path = require('path');
const db = require('./config/mongoose');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require('connect-mongo');
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
//const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fastcsv = require('fast-csv');

app.use(express.urlencoded({ extended: true }));

//app.use(express.static('./assets'));
app.use(express.static('assets'));
// template engine

app.use(express.json());

// Use express-ejs-layouts as middleware
app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
//app.use(createCsvWriter);


app.set('view engine','ejs');
// app.set('views','./views');
app.set('views',path.join(__dirname,'views'));

app.use(session({
    name: 'placement cell',
    //todo change the secret before deployment in poduction mode
    secret: 'blahsomething',
    //secret: env.session_cookie_key,
    saveUninitialized: false,
    resave: false,
    cookie:{
        maxAge: (1000*60*100) //ms
    },
    store:MongoStore.create({
        //mongooseConnection:db,
        client:mongoose.connection.getClient(db),
        autoRemove: 'disabled',
        collection: 'sessions',
    },
    function(err){
        console.log(err ||'connect-mongodb setup ok');
    })
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Define your routes
app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        console.log('Error in running server', err);
    }
    console.log('Yup! My express server is running on port:', port);
});