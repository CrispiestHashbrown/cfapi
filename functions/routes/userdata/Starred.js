const express = require('express');
const router = express.Router();
const request = require('request');
const query = require('../../helpers/QueryParser');

router.use(express.json());

// -- routes --
// GET starred repos
router.get('/', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/starred${query(req.url)}`;
  request.get(url, {
    headers: {
      'Authorization': `bearer ${ght}`,
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.setHeader('Link', response.headers.link);
      const starredRepos = JSON.parse(body);
      return res.status(response.statusCode).send(starredRepos);
    } else {
      console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
    }
  });
});

// GET to check if user is starring a repository
router.get('/:owner/:repo', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
  request.get(url, {
    headers: {
      'Authorization': `bearer ${ght}`,
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

// PUT to star a repo
router.put('/:owner/:repo', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
  request.put(url, {
    headers: {
      'Authorization': `bearer ${ght}`,
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json',
      'Content-Length': 0
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 204) {
      return res.status(response.statusCode).send('No Content');
    } else {
      console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
    }
  });
});

// DELETE to unstar repo
router.delete('/:owner/:repo', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/starred/${req.params.owner}/${req.params.repo}`;
  request.delete(url, {
    headers: {
      'Authorization': `bearer ${ght}`,
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

module.exports = router;
