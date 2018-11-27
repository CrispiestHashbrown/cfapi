const firebase = require('firebase-admin');

function setResponseHeaders (req, res, next) {
  res.setHeader('Date', firebase.firestore.Timestamp.now().toDate());
  res.header('Access-Control-Allow-Origin', 'http://localhost:8100');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Origin, Access-Control-Allow-Headers');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  next();
}

module.exports = setResponseHeaders;
