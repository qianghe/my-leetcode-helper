const Controller = require('egg').Controller

class UserController extends Controller {
  async getUserGoalInfo() {
    const { ctx } = this
    const { userName } = ctx.query

    const user = await ctx.service.user.findOneByUserName(userName)
    
    ctx.body = user
  }
}

module.exports = UserController