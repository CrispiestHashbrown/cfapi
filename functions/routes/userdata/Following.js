const express = require('express');
const router = express.Router();
const request = require('request');
const tokenVerifier = require('../../helpers/TokenVerifier');

router.use(express.json());

// -- routes --
// GET list of who the authenticated user is following
router.get('/', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/following`;
      request.get(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.setHeader('Link', response.headers.link);
          const usersFollowed = JSON.parse(body);
          return res.status(200).send(usersFollowed);
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

// GET to check if authenticated user is following another user
router.get('/:user', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/following/${req.params.user}`;
      request.get(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      }, function (error, response) {
        if (!error && response.statusCode === 204) {
          return res.status(204).send('No Content');
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

// PUT to follow a GitHub user
router.put('/:user', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/following/${req.params.user}`;
      request.put(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json',
          'Content-Length': 0
        }
      }, function (error, response) {
        if (!error && response.statusCode === 204) {
          return res.status(response.statusCode).send('No Content');
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

// DELETE to unfollow a GitHub user
router.delete('/:user', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/following/${req.params.user}`;
      request.delete(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode === 204) {
          return res.status(response.statusCode).send('No Content');
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

module.exports = router;
