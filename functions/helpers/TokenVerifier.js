const functions = require('firebase-functions');
const request = require('request');
const _ = require('lodash');
const ghid = functions.config().appauth.ghid;

function isAccessTokenValid (ght, callback) {
  const url = `https://api.github.com/applications/${ghid}/tokens/${ght}`;
  request.get(url, {
    'auth': {
      'user': ghid,
      'pass': functions.config().appauth.ghs
    },
    headers: {
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  }, function (err, res, body) {
    var verificationResult = false;
    if (!err && res.statusCode === 200) {
      const scopeObject = [
        'public_repo',
        'read:user',
        'user:follow'
      ];
      const parsedBody = JSON.parse(body);
      verificationResult = _.isEqual(parsedBody.scopes, scopeObject);
    }
    return callback(verificationResult, err);
  });
}

module.exports = isAccessTokenValid;
