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

    const target = await this.ctx.model.Problem.findOne(search)

    return target
  }

  async findAll() {
    const targets = await this.ctx.model.Problem.find()
    return targets
  }

  async findByTimeRange(start, end) {
    const search = {
      'update_time': {
        $lt: end,
        $gt: start
      }
    }

    const res = await this.ctx.model.Problem
      .find(search)
      .sort({ "update_time": 1 })
    
    return res
  }
}

module.exports = ProblemService