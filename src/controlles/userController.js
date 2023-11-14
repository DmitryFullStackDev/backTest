class UserController {
  async getUser(req, res, next) {
    res.json({ mes: 'hello1' })
  }
}

module.exports = new UserController()
