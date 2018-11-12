const request = require('request');

function repeatGetRequest (options, res) {
  const timeout = 500;
  function recursiveRepeatGetRequest (options, retries) {
    request.get(options, function (error, response, body) {
      if (!error && retries > 0 && response.statusCode === 200) {
        const parsedBody = JSON.parse(body);
        console.log(parsedBody);
        return res.status(response.statusCode).send(parsedBody);
      } else if (!error && retries > 0 && response.statusCode === 202) {
        --retries;
        return setTimeout(function () {
          repeatGetRequest(options, retries);
        }, timeout);
      } else {
        console.log(`${response.statusCode} response: Error accessing the Github API.`, error);
        return res.status(500).send('Error while accessing GitHub.');
      }
    });
  }

  return recursiveRepeatGetRequest(options, 10);
}

module.exports = repeatGetRequest;
