const firebase = require('firebase/app')
const express = require('express')
const bodyParser = require('body-parser')
const router = require('./routes')

const firebaseConfig = {
  apiKey: 'AIzaSyAemtyDl1a990wUoBH4On1sockix6UImUM',
  authDomain: 'thesprkl-webflow.firebaseapp.com',
  projectId: 'thesprkl-webflow',
  storageBucket: 'thesprkl-webflow.appspot.com',
  messagingSenderId: '729072792455',
  appId: '1:729072792455:web:3473ee2fea1586c4631922',
}
firebase.initializeApp(firebaseConfig)

const app = express()
app.use(bodyParser.json())

app.use('/', router)

module.exports = app
