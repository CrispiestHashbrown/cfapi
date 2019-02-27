const request = require('request');

function repeatGetRequest (options, res) {
  const timeout = 500;
  function recursiveRepeatGetRequest (options, retries) {
    request.get(options, function (error, response, body) {
      if (!error && retries > 0 && response.statusCode === 200) {
        const parsedBody = JSON.parse(body);
        return res.status(response.statusCode).send(parsedBody);
      } else if (!error && retries > 0 && response.statusCode === 202) {
        --retries;
        return setTimeout(function () {
          repeatGetRequest(options, retries);
        }, timeout);
      } else {
        return res.status(response.statusCode).send(`Error while accessing GitHub: ${error}`);
      }
    });
  }

  return recursiveRepeatGetRequest(options, 10);
}

module.exports = repeatGetRequest;
