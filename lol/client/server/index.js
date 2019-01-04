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

// // Login endpoint
// app.get('/account/login', account.login);
//
// // Callback endpoint
// app.get('/account/callback', account.callback);
//
// // Logout endpoint
// app.get('/account/logout', account.logout);
//
// // Execute bot command endpoint
// app.post('/command', (req, res) => {
//     const parsed = require('url').parse(req.headers.origin || '');
//     const origin = parsed.protocol + '//' + parsed.host + parsed.pathname;
//
//     const isValid = origin === settings.homeURL;
//     const isXHR = req.headers['x-requested-with'] === 'XMLHttpRequest';
//
//     // Method not allowed
//     if (!isValid || !isXHR) {
//         res.status(403).end('Method not allowed');
//         return;
//     }
//
//     const commands = [ 'start', 'stop', 'restart' ];
//     const bots = [ 'sudo', 'atis' ];
//     const cmd = req.body.cmd;
//     const bot = req.body.bot;
//
//     // User without permission (no Moderator / Admin)
//     if (!req.session.hasPerm) res.status(401).end('Permission denied');
//
//     // Invalid command
//     else if (commands.indexOf(cmd) < 0) res.status(400).end('No such command');
//
//     // Invalid bot name
//     else if (bots.indexOf(bot) < 0) res.status(400).end('No such bot');
//
//     else {
//         exec(`pm2 ${cmd} ${bot}`);
//         const map = { start: 'started', stop: 'stopped', restart: 'restarted' };
//         res.status(200).end(`Success: <strong>${bot}</strong> ${map[cmd]}.`);
//     }
// });
//
// // File server
// app.use((req, res) => {
//     const existing = [ 'js', 'css', 'node_modules' ];
//
//     let url = require('url').parse(req.url).pathname;
//     if (url[0] === '/') url = url.substring(1, url.length);
//     const urlElem = url.split('/');
//     const absPath = path.join(__dirname, url);
//
//     // Normalizes referer
//     const parsed = require('url').parse(req.headers.referer || '');
//     const referer = parsed.protocol + '//' + parsed.host + parsed.pathname;
//
//     fs.lstatAsync(absPath).then(stat => {
//         // Denied: invalid origin, existing directory, or config files
//         const denied = referer !== settings.homeURL
//             || stat.isDirectory()
//             || urlElem[urlElem.length - 1].startsWith('.');
//
//         if (denied)
//             res.status(403).send('<center><h1>403 Forbidden</h1></center><hr>');
//
//         // Does not "exist" (dir not available)
//         else if (existing.indexOf(urlElem[0]) < 0)
//             res.status(400).send('<center><h1>404 Not Found</h1></center><hr>');
//
//         // File request success
//         else res.status(200).sendFile(absPath);
//
//     }).catch(err => { // jshint ignore:line
//         // Not found
//         res.status(400).send('<center><h1>404 Not Found</h1></center><hr>');
//     });
// });

app.listen(settings.PORT, () => console.log('Running at port %d', settings.PORT));

module.exports = app;
