const firebase = require('firebase-admin');

function setResponseHeaders (req, res, next) {
  res.setHeader('Date', firebase.firestore.Timestamp.now().toDate());
  next();
}

module.exports = setResponseHeaders;
