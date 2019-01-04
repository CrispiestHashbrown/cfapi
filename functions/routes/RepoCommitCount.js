const express = require('express');
const router = express.Router();
const repeatGetRequest = require('../helpers/RequestRepeater');

router.use(express.json());

// -- routes --
// GET repository commit count for the past year
router.get('/', (req, res) => {
  const ght = req.session.ght;
  if (!ght) {
    return res.status(401).send('Unauthorized request');
  }

  const options = {
    url: `https://api.github.com/repos/${req.query.owner}/${req.query.repo}/stats/participation`,
    headers: {
      'Authorization': `bearer ${ght}`,
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  };

  repeatGetRequest(options, res);
});

module.exports = router;
