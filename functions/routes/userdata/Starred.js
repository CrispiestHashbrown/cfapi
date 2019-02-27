const express = require('express');
const router = express.Router();
const request = require('request');
const query = require('../../helpers/QueryParser');
const tokenVerifier = require('../../helpers/TokenVerifier');

router.use(express.json());

// -- routes --
// GET starred repos
router.get('/', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/starred${query(req.url)}`;
      request.get(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.setHeader('Link', response.headers.link);
          const starredRepos = JSON.parse(body);
          return res.status(200).send(starredRepos);
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

// GET to check if user is starring a repository
router.get('/:owner/:repo', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
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

// PUT to star a repo
router.put('/:owner/:repo', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
      request.put(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json',
          'Content-Length': 0
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

// DELETE to unstar repo
router.delete('/:owner/:repo', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
      request.delete(url, {
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

module.exports = router;
