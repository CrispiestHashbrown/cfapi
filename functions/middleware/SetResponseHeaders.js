const firebase = require('firebase-admin');

function setResponseHeaders (req, res, next) {
  res.setHeader('Date', firebase.firestore.Timestamp.now().toDate());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Expose-Headers', 'Link');
  next();
}

module.exports = setResponseHeaders;
