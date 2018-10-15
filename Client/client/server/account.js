'use strict';

const Promise = require('bluebird');
const request = require('request-promise');
const querystring = require('querystring');
const settings = require('./settings.json');
const parse = require('./parse');

const HOST = 'https://discordapp.com/api/';
const TOKEN_LINK = HOST + 'oauth2/authorize?' + querystring.stringify({
    client_id: settings.client.id,
    redirect_uri: settings.redirectURI,
    response_type: 'code',
    scope: 'identify guilds'
});

// Called in app.js, login endpoint
function login (req, res) {
    req.session.started = true;
    req.session.ip = req.headers['cf-connecting-ip']
        || req.headers['x-real-ip']
        || req.connection.remoteAddress;
    res.redirect(TOKEN_LINK);
}

// Called in app.js, callback endpoint
function callback (req, res) {
    const ssn = req.session;

    if (!ssn.started) {
        res.redirect('/');
        return;
    }

    const urlArgs = parse(req.url);

    // On receiving authorization code
    if (urlArgs.code) {
        ssn.authCode = urlArgs.code;
    } else if (urlArgs.error) {
        log('Login error: %s (%s)', urlArgs.error, ssn.ip);
        ssn.destroy();
        res.redirect('/?error=' + urlArgs.error);
    }

    // Exchanges for information
    if (ssn.authCode && !ssn.accessToken) {

        // Gets access token
        getAccessToken(req)
            .then(getUserInfo)
            .then(getUserGuilds)
            .then(json => {
                ssn.inServer = false;
                for (let server of json) {
                    if (server.name === 'GeoFS Official Server') {
                        ssn.inServer = true;
                        break;
                    }
                }

                res.redirect('/');
            }).catch(err => {
                console.log(err);
                log(err.error);
                res.redirect('/?error=' + err.error);
            });
    }
}

// Called in app.js, logout endpoint
function logout (req, res) {
    const ssn = req.session;
    if (!ssn.loggedIn) res.redirect('/');
    else destroy(ssn, res);
}

// ==== Helper Methods ====

function log (...args) {
    const date = '[ ' + new Date().toUTCString() + ' ] ';
    console.log(date + (args.shift() || ''), ...args);
}

/**
 * Gets user access token
 *
 * @param {Object} req The request object
 * @returns {Promise}
 */
function getAccessToken (req) {
    const ssn = req.session;
    return request.post({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: HOST + 'oauth2/token',
        form: {
            client_id: settings.client.id,
            client_secret: settings.client.secret,
            grant_type: 'authorization_code',
            code: ssn.authCode,
            redirect_uri: settings.redirectURI,
            scope: 'identify guilds'
        }
    }).then(data => {
        data = JSON.parse(data);
        ssn.accessToken = data.access_token;
        ssn.refreshToken = data.refresh_token;
        ssn.loggedIn = true;

        return Promise.resolve(req);
    }).catch(err => Promise.reject(err));
}

/**
 * Gets username and tag number
 *
 * @param {Object} req The request object
 * @returns {Promise}
 */
function getUserInfo (req) {
    const ssn = req.session;
    return request.get({
        headers: { 'Authorization': 'Bearer ' + ssn.accessToken },
        url: HOST + 'users/@me'
    }).then(data => {
        data = JSON.parse(data);
        ssn.uid = data.id;
        ssn.username = data.username + '#' + data.discriminator;
        ssn.email = data.email;
        log('Logged in: %s (%s)', ssn.username, ssn.ip);
        return Promise.resolve(req);
    }).catch(err => Promise.reject(err));
}

/**
 * Gets the server the user is in
 *
 * @param {Object} req The request object
 * @returns {Promise}
 */
function getUserGuilds (req) {
    const ssn = req.session;
    return request.get({
        headers: { 'Authorization': 'Bearer ' + ssn.accessToken },
        url: HOST + 'users/@me/guilds'
    }).then(data => {
        return Promise.resolve(JSON.parse(data));
    }).catch(err => Promise.reject(err));
}

/**
 * Handles logout destroying session
 *
 * @param {Object} ssn Session object
 * @param {Object} res Response object
 */
function destroy (ssn, res) {
    request.post({
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        url: HOST + 'oauth2/token/revoke',
        form: {
            client_id: settings.client.id,
            client_secret: settings.client.secret,
            token: ssn.accessToken,
            redirect_uri: settings.redirectURI
        }
    }).then(() => {
        log('Logged out: %s (%s)', ssn.username, ssn.ip);
        if (ssn.destroy) ssn.destroy();
        res.redirect('/');
    }).catch(err => {
        log(err.error);
        res.redirect('/?error=' + err.error);
    });
}

module.exports = { login, callback, logout };
