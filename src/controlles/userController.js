const firestore = require('firebase/firestore')
const firebaseAuth = require('firebase/auth')
const request = require('request')

const usersCollection = 'users'
const SALT = 'Sprkl#eW8a$$H@r'

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

  static getDate(ms) {
    return firestore.Timestamp.fromMillis(Number(ms) * 1000)
  }

  static getUserDoc(email) {
    const db = firestore.getFirestore()
    return firestore.doc(db, usersCollection, email)
  }

  static saltCheck(res, salt) {}

  async createUser(req, res, next) {
    const { email, validDate, type, salt } = req.body
    const auth = firebaseAuth.getAuth()

    if (salt !== SALT) {
      res.json({ status: 'failed' })
      return
    }

    firebaseAuth
      .createUserWithEmailAndPassword(auth, email, 'qweasd!qwessQsdx')
      .then(async () => {
        const doc = UserController.getUserDoc(email)
        await firestore.setDoc(doc, {
          type,
          validDate: UserController.getDate(validDate),
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
    const { email, validDate, type, salt } = req.body
    const doc = UserController.getUserDoc(email)

    if (salt !== SALT) {
      res.json({ status: 'failed' })
      return
    }

    await firestore
      .updateDoc(doc, { validDate: UserController.getDate(validDate), type })
      .then(() => {
        res.json({ status: 'success' })
      })
      .catch(error => {
        res.json({ status: 'failed' })
      })
  }
}

module.exports = new UserController()
