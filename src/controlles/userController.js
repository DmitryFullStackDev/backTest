const firestore = require('firebase/firestore')
const firebaseAuth = require('firebase/auth')
const request = require('request')

class UserController {
  async createUser(req, res, next) {
    const auth = firebaseAuth.getAuth()

    const updateClient = postData => {
      const clientServerOptions = {
        uri: 'http://localhost:8080/firebase/test',
        body: JSON.stringify(postData),
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
      }
      request(clientServerOptions)
    }

    firebaseAuth
      .createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(() => {
        updateClient({ status: 'success' })
      })
      .then(() => {
        res.json({ status: 'success' })
      })
      .catch(() => {
        res.json({ status: 'failed' })
      })
  }

  async test(req, res, next) {
    const db = firestore.getFirestore()
    const dbRef = firestore.collection(db, 'newTest')

    await firestore
      .addDoc(dbRef, { data: req.body })
      .then(() => {
        res.json({ status: 'success' })
      })
      .catch(error => {
        res.json({ status: 'failed' })
      })
  }
}

module.exports = new UserController()
