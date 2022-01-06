const Controller = require('egg').Controller

class ProblemController extends Controller {
  async getAllProblemByTimeRange() {
    const { ctx } = this
    const problems = await ctx.service.problem.findAll()
    
		ctx.body = problems
  }

  async getGroupedProblems() {
    const problems = await this.getAllProblemByTimeRange()
    const groupedMap = problems.reduce((map, p) => {
      const { tags, 'leetcode_id': leetcodeId } = p
      tags.forEach(({ name }) => {
        if (!map[name]) {
          map[name] = []
        }
        map[name].push(leetcodeId)
      })

      return map
    }, {})
    
    ctx.body = groupedMap
  }
}

module.exports = ProblemController