const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const Auth = require('./routes/Auth');
const Repos = require('./routes/userdata/Repos');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

const app = express();

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader('Date', firebase.firestore.Timestamp.now().toDate());
  next();
});
app.use('/__/auth', Auth);
app.use('/user/repos', Repos);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

exports.app = functions.https.onRequest(app);
