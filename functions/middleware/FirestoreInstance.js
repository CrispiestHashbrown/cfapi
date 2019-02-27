const functions = require('firebase-functions');
const firebase = require('firebase-admin');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
).firestore();

module.exports = firebaseApp;
