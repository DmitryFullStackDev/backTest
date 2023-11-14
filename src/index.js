const express = require('express')
const router = require('./routes')

const app = express()

app.use('/', router)

const start = async () => {
  try {
    app.listen(8080, () => console.log('run'))
  } catch (e) {
    console.log(e)
  }
}

start()
