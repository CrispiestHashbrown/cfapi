const request = require('request');
const config = require('config');
const _ = require('lodash');
const client_id = config.get('appauth.client_id');

function isAccessTokenValid (token, callback) {
  const url = `https://api.github.com/applications/${client_id}/tokens/${token}`;
  request.get(url, {
    'auth': {
      'user': client_id,
      'pass': config.get('appauth.client_secret')
    },
    headers: {
      'User-Agent': 'CrispiestHashbrown',
      'Accept': 'application/json'
    }
  }, function (err, res, body) {
    if (!err && res.statusCode === 200) {
      const scopeObject = [
        'public_repo',
        'read:repo_hook',
        'read:user',
        'user:follow'
      ];
      const parsedBody = JSON.parse(body);
      const validationResult = _.isEqual(parsedBody.scopes, scopeObject);
      return callback(validationResult);
    } else {
      console.log('There was an error while accessing the Github API.', err);
    }
  });
}

module.exports = isAccessTokenValid;
