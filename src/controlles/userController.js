class UserController {
  async getUser(req, res, next) {
    res.json({ newMessage: 'newMessage' })
  }
}

module.exports = new UserController()
