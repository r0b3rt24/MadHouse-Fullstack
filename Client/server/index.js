'use strict';

'use strict';

const Promise = require('bluebird');

const bodyParser = require('body-parser');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
// const mustache = require('mustache-express');

const fs = Promise.promisifyAll(require('fs'));
const path = require('path');
// const account = require('./account');
const settings = require('./settings.json');

const exec = require('child_process').exec;

const app = express();

// Body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Creates session
app.use(cookieParser());
app.use(session({
    name: '_madhaus',
    secret: crypto.createHash('sha256').update('' + Date.now()).digest('hex'),
    resave: false,
    saveUninitialized: false,
    // proxy: settings.proxy,
    cookie: {
        // secure: settings.secure,
        httpOnly: true,
        maxAge: 604800 * 1000, // 604800 seconds
    }
}));

// Sets mustache as render template
// app.engine('mustache', mustache());
// app.set('view engine', 'mustache');

// Dynamicly checks user roles
app.use((req, res, next) => { // jshint ignore:line
    next();
});

// Home
app.get('/storage', (req, res) => { // jshint ignore:line
    fs.readFileAsync('data.json', 'utf-8').then(JSON.parse).then(json => res.json(json));
});


app.listen(settings.PORT, () => console.log('Running at port %d', settings.PORT));

module.exports = app;
