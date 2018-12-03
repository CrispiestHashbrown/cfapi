const functions = require('firebase-functions');
const express = require('express');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');
const base64url = require('base64url');

const client_id = functions.config().appauth.client_id;
const stateValue = unguessableRandomString(20);
const scopeTruth = 'public_repo,read:user,user:follow';

router.use(express.json());

// -- routes --
// Redirect user for GitHub auth
router.get('/', (req, res) => {
  const appScopes = req.query.scope;
  if (appScopes !== scopeTruth) {
    return res.status(400).send('Bad request.');
  }

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&scope=${scopeTruth}&state=${stateValue}`;
  res.redirect(301, url);
});

// Auth handler with access code
router.get('/handler', (req, res) => {
  if (!req.query.code) {
    return res.status(400).send('Bad request');
  }

  const options = {
    uri: 'https://github.com/login/oauth/access_token',
    method: 'POST',
    body: {
      client_id: client_id,
      client_secret: functions.config().appauth.client_secret,
      code: req.query.code,
      state: stateValue
    },
    headers: {
      'Accept': 'application/json'
    },
    json: true
  };

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      req.session.regenerate(function (regenerateErr) {
        if (!regenerateErr) {
          req.session.access_token = body.access_token;
          req.session.cookie.maxAge = 604800000;
          res.status(200).send('Authorization was successful.');
        } else {
          console.log(regenerateErr);
          res.status(500).send('Internal error.');
        }
      });
    } else {
      console.log(`${response.statusCode} error: ${error}`);
      res.status(500).send('Error while authenticating with GitHub.');
    }
  }

  request.post(options, callback);
});

// DELETE to revoke app access grant
router.delete('/grants', (req, res) => {
  const access_token = req.session.access_token;
  if (!access_token) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/applications/${client_id}/grants/${access_token}`;
  request.delete(url, {
    'auth': {
      'user': client_id,
      'pass': functions.config().appauth.client_secret
    },
    headers: {
      'Authorization': `bearer ${access_token}`,
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 204) {
      return res.status(response.statusCode).send('No Content');
    } else {
      console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
    }
  });
});

// GET confirmation if valid access token exists
router.get('/ping', (req, res) => {
  const access_token = req.session.access_token;
  if (!access_token) {
    return res.status(400).send('Bad request.');
  } else {
    return res.status(200);
  }
});

// Generate unguessable random string
function unguessableRandomString (size) {
  return base64url(crypto.randomBytes(size));
}

module.exports = router;
