const Service = require('egg').Service

class UserService extends Service {
  async add(user) {
    await this.ctx.model.User.insert(user)
  }

  async findOneByUserName(user_name) {
    const search = {
      'user_name': user_name
    }
  
    const user = await this.ctx.model.User.findOne(search)

    return user
  }
}

module.exports = UserService