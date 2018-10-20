const queryString = require('query-string');

function parseQuery (url) {
  if (queryString.extract(url)) {
    return `?${queryString.extract(url)}`;
  } else {
    return '';
  }
}

module.exports = parseQuery;
