const Controller = require('egg').Controller

class ProblemController extends Controller {
  async getAllProblemByMonth() {
    const { ctx } = this
    const problems = await ctx.service.problem.findAll()

    const groupedByDateMap = problems.reduce((grouped, problem) => {
      const { update_time, difficulty } = problem
      const yearMonthTime = getSliceTimestamp(update_time)
      if (!grouped[yearMonthTime]) {
        grouped[yearMonthTime].push({
          hard: 0,
          medium: 0,
          easy: 0
        })
      }
      const groupedInfo = grouped[yearMonthTime]
      
      if (groupedInfo[difficulty.toLowerCase()] !== undefined) {
        [difficulty.toLowerCase()]++
      }
    }, {})

    const monthGroupedInfos = Object.keys(groupedByDateMap).map(time => ({
      time,
      ...groupedByDateMap[time]
    })).sort((a, b) => b.time - a.time)
    
		ctx.body = monthGroupedInfos
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