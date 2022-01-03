const Controller = require('egg').Controller

class ProblemController extends Controller {
  async getAllProblemByTimeRange() {
    const { ctx } = this
    const problems = await ctx.service.problem.find()
    
		ctx.body = problems
  }
}

module.exports = ProblemController