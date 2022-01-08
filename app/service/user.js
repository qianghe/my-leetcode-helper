const Service = require('egg').Service

class UserService extends Service {
  async add(user) {
    await this.ctx.model.User.insert(user)
  }

  async findOneByUserName(userName) {
    const search = {
      'user_name': userName
    }
  
    const user = await this.ctx.model.User.findOne(search)

    return user
  }

  async updateCur(userName, inc = 0) {
    const user = await this.findOneByUserName(userName)

    if (user) {
      const { cur } = user
      const nextCur = inc + cur

      await this.ctx.model.User.update({
        'user_name': userName
      }, {
        $set: {
          cur: nextCur
        }
      })
    }
  }
}

module.exports = UserService