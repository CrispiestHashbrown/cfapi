const functions = require('firebase-functions');
const firebase = require('firebase-admin');
const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const FirestoreStore = require('firestore-store')(session);
const ResponseHeaders = require('./middleware/SetResponseHeaders');
const cors = require('cors');

const Auth = require('./routes/Auth');
const RepoCommitCount = require('./routes/RepoCommitCount');
const Repos = require('./routes/userdata/Repos');
const Issues = require('./routes/Issues');
const Following = require('./routes/userdata/Following');
const Starred = require('./routes/userdata/Starred');
const Search = require('./routes/Search');

const firebaseApp = firebase.initializeApp(
  functions.config().firebase
);

const app = express();
const sessionSecret = functions.config().session.secret;

if (!sessionSecret) {
  console.error('FATAL ERROR');
  process.exit(1);
}

var userSession = session({
  store: new FirestoreStore({
    database: firebaseApp.firestore()
  }),
  name: '__session',
  secret: sessionSecret,
  proxy: true,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 300000,
    secure: true,
    httpOnly: false
  }
});

app.use(cors());
app.use(helmet());
app.use(helmet.hsts({
  maxAge: 31536000
}));
app.use(userSession);
app.use(express.json());
app.use(ResponseHeaders);
app.use('/__/auth', Auth);
app.use('/repocommitcount', RepoCommitCount);
app.use('/user/repos', Repos);
app.use('/issues', Issues);
app.use('/user/following', Following);
app.use('/user/starred', Starred);
app.use('/search/repositories', Search);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

exports.app = functions.https.onRequest(app);
