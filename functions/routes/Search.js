const express = require('express');
const router = express.Router();
const request = require('request');
const query = require('../helpers/QueryParser');
const tokenVerifier = require('../helpers/TokenVerifier');

router.use(express.json());

// -- routes --
// GET repository search results
router.get('/', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const url = `https://api.github.com/search/repositories${query(req.url)}`;
      request.get(url, {
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
          res.setHeader('Link', response.headers.link);
          const parsedBody = JSON.parse(body);
          return res.status(200).send(parsedBody);
        } else {
          return res.status(response.statusCode).send(`Error accessing the Github API: ${error}`);
        }
      });
    }
  });
});

module.exports = router;
