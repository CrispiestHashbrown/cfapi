const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');

const Auth = require('./routes/Auth');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

const app = express();

app.use(express.json());
app.use('/__/auth', Auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

exports.app = functions.https.onRequest(app);
