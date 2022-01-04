const Controller = require('egg').Controller

class ProblemController extends Controller {
  async getAllProblemByTimeRange() {
    const { ctx } = this
    const problems = await ctx.service.problem.findAll()
    
		ctx.body = problems
  }

  async getGroupedProblems() {
    const problems = await this.getAllProblemByTimeRange()
  }
}

module.exports = ProblemController