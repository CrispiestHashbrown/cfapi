const express = require('express');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');
const base64url = require('base64url');
const config = require('config');

const stateValue = unguessableRandomString(20);

router.use(express.json());

// -- routes --
// Redirect user for GitHub auth
router.get('/', (req, res) => {
  const scope = 'user:follow,read:user,public_repo,read:repo_hook';
  const userScope = req.query.scope;
  if (userScope !== scope) {
    return res.status(400).send('Bad request.');
  }

  const client_id = config.get('appauth.client_id');
  const state = stateValue;
  res.set({
    'Date': new Date()
  });

  const url = `https://github.com/login/oauth/authorize?client_id=${client_id}&?scope=${scope}&?state=${state}`;
  res.redirect(url);
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
      client_id: config.get('appauth.client_id'),
      client_secret: config.get('appauth.client_secret'),
      code: req.query.code,
      state: stateValue
    },
    headers: {
      Date: new Date(),
      'Accept': 'application/json'
    },
    json: true
  };

  function callback (error, response, body) {
    if (!error && response.statusCode === 200) {
      const access_token = body.access_token;
      // Verify token scope here
    }
  }

  request.post(options, callback);
});

// Generate unguessable random string
function unguessableRandomString (size) {
  return base64url(crypto.randomBytes(size));
}

module.exports = router;
