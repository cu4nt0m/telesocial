const functions = require("firebase-functions");
const express = require('express');

const app = express();

const fbAuth = require ('./util/fbAuth');

const { getAllGraphs, postOneGraph } = require('./handlers/graphs');
const { signup, login, uploadImage } = require('./handlers/users');

// const firebase = require('firebase');
// firebase.initializeApp(config);


//graphs routes
app.get('/graphs', getAllGraphs);
app.post('/graph', fbAuth, postOneGraph);

//users
app.post('/signup', signup)
app.post('/login', login)
app.post('/user/image',fbAuth, uploadImage)


exports.api = functions.region('europe-west1').https.onRequest(app);