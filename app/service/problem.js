const Service = require('egg').Service

class ProblemService extends Service {
  async add(problems) {
    await this.ctx.model.Problem.insertMany(problems)
  }

  async deleteOne(problem) {
    const search = {
      'leetcode_id': problem['leetcode_id']
    }
    await this.ctx.model.Problem.delete(search)
  }

  async deleteMore(problems) {
    const leetcodeIds = problems.map(({ 'leetcode_id': leetcodeId}) => leetcodeId)
    const search = {
      'leetcode_id': {
        $in: leetcodeIds
      }
    }
    await this.ctx.model.Problem.delete(search)
  }

  async findOne(problem) {
    const search = {
      'leetcode_id': problem['leetcode_id']
    }

    await this.ctx.model.Problem.findOne(search)
  }

  async findAll() {
    await this.ctx.model.Problem.find()
  }

  async findByConditions(search) {
    await this.ctx.model.Problem.find(search)
  }
}

module.exports = ProblemService