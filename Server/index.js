const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//set up express app
const app = express();
passport = require('passport'),
auth = require('./auth');
cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session');

app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


// Build the DB connection
mongoose.connect('mongodb://r0b3rt23:madhacks2018@ds159263.mlab.com:59263/madhouse');
mongoose.Promise = global.Promise;


/*
Use the middle ware that we created 
*/
app.use(bodyParser.json());
app.use('/api',routes);

auth(passport);
app.use(passport.initialize());
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));

app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/'}),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('/');
    }
);

app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});

// error handling 
app.use((err, req, res, next)=>{
    res.status(422).send({
        error: err.message,
    })
})

/*
listen for requests
either on env.port or 4000
*/
app.listen(process.env.port || 4000, function(){
    console.log("Now listening for requests")
})


