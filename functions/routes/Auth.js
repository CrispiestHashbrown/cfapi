const functions = require('firebase-functions');
const express = require('express');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');
const base64url = require('base64url');

const client_id = functions.config().appauth.client_id;
const stateValue = unguessableRandomString(20);
const scopeTruth = 'public_repo,read:repo_hook,read:user,user:follow';

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
      // TODO: allow access_token for use
      res.status(200).send('Authorization was successful.');
    } else {
      console.log(`${response.statusCode} error: ${error}`);
      res.status(500).send('Error while authenticating with GitHub.');
    }
  }

  request.post(options, callback);
});

// Generate unguessable random string
function unguessableRandomString (size) {
  return base64url(crypto.randomBytes(size));
}

module.exports = router;
