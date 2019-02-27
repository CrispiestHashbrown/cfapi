const express = require('express');
const router = express.Router();
const repeatGetRequest = require('../helpers/RequestRepeater');
const tokenVerifier = require('../helpers/TokenVerifier');

router.use(express.json());

// -- routes --
// GET repository commit count for the past year
router.get('/', (req, res) => {
  const authHeader = req.header('Authorization');
  tokenVerifier(authHeader, function (verifierRes, verifierErr) {
    if (!verifierRes) {
      res.status(400).send(`Error verifying token: ${verifierErr}`);
    } else {
      const options = {
        url: `https://api.github.com/repos/${req.query.owner}/${req.query.repo}/stats/participation`,
        headers: {
          'Authorization': authHeader,
          'User-Agent': 'CrispiestHashbrown',
          'Accept': 'application/json'
        }
      };

      repeatGetRequest(options, res);
    }
  });
});

module.exports = router;
