const express = require('express');
const router = express.Router();
const request = require('request');

router.use(express.json());

// -- routes --
// GET list of who the authenticated user is following
router.get('/', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/following`;
  request.get(url, {
    headers: {
      'Authorization': `bearer ${ght}`,
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      res.setHeader('Link', response.headers.link);
      const usersFollowed = JSON.parse(body);
      return res.status(response.statusCode).send(usersFollowed);
    } else {
      console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
    }
  });
});

// GET to check if authenticated user is following another user
router.get('/:user', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/following/${req.params.user}`;
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

// PUT to follow a GitHub user
router.put('/:user', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/following/${req.params.user}`;
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

// DELETE to unfollow a GitHub user
router.delete('/:user', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/following/${req.params.user}`;
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
