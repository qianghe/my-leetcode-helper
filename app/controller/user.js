const Controller = require('egg').Controller

class UserController extends Controller {
  async getUserGoalInfo(username) {
    const user = await findOneByUserName(username)
    return user
  }
}

module.exports = UserController