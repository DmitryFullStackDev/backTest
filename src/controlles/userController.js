const firestore = require('firebase/firestore')
const firebaseAuth = require('firebase/auth')
const request = require('request')

const usersCollection = 'users'

class UserController {
  static updateClient(postData) {
    const clientServerOptions = {
      uri: 'https://hooks.zapier.com/hooks/catch/2278010/3znwapu/',
      body: JSON.stringify(postData),
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
    }
    request(clientServerOptions)
  }

  static getUserDoc(email) {
    const db = firestore.getFirestore()
    return firestore.doc(db, usersCollection, email)
  }

  async createUser(req, res, next) {
    const { email, validDate, type } = req.body
    const auth = firebaseAuth.getAuth()

    firebaseAuth
      .createUserWithEmailAndPassword(auth, email, 'qweasd!qwessQsdx')
      .then(async () => {
        const doc = UserController.getUserDoc(email)
        await firestore.setDoc(doc, {
          type,
          validDate,
        })
        await firebaseAuth.sendPasswordResetEmail(auth, email)
      })
      .then(() => {
        UserController.updateClient({
          status: 'success',
          email: req.body.email,
        })
      })
      .then(() => {
        res.json({ status: 'success' })
      })
      .catch(() => {
        res.json({ status: 'failed' })
      })
  }

  async extendSubscription(req, res, next) {
    const { email, validDate, type } = req.body
    const doc = UserController.getUserDoc(email)

    await firestore
      .updateDoc(doc, { validDate, type })
      .then(() => {
        res.json({ status: 'success' })
      })
      .catch(error => {
        res.json({ status: 'failed' })
      })
  }
}

module.exports = new UserController()
