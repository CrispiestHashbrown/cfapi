const firebase = require('firebase-admin');

function setResponseHeaders (req, res, next) {
  res.setHeader('Date', firebase.firestore.Timestamp.now().toDate());
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.set('Access-Control-Expose-Headers', 'Link');
  if (req.method === 'OPTIONS') {
    return res.status(200).json({});
  }
  next();
}

module.exports = setResponseHeaders;
