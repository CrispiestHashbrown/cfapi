const express = require('express');
const router = express.Router();
const request = require('request');
const query = require('../../helpers/QueryParser');

router.use(express.json());

// -- routes --
// GET user repositories
router.get('/', (req, res) => {
  // TODO: Set up sessions
  const sessionStorage = '';
  const access_token = sessionStorage.access_token;
  if (!req.query.access_token) {
    return res.status(401).send('Unauthorized request');
  }

  const url = `https://api.github.com/user/repos${query(req.url)}`;
  console.log(url);
  request.get(url, {
    headers: {
      'Authorization': `bearer ${access_token}`,
      'User-Agent': 'CrispiestHashbrown',
      Date: new Date(),
      'Accept': 'application/json'
    }
  }, function (error, response, body) {
    if (!error && response.statusCode === 200) {
      const parsedBody = JSON.parse(body);
      res.status(response.statusCode).send(parsedBody);
    } else {
      console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
    }
  });
});

module.exports = router;
