const Controller = require('egg').Controller
const { formatTime, getTimestamp, getSliceTimestamp } = require('../util')

class ProblemController extends Controller {
  async getAllProblemByMonth() {
    const { ctx } = this
    const problems = await ctx.service.problem.findAll()

    const groupedByDateMap = problems.reduce((grouped, problem) => {
      const { update_time, difficulty } = problem
      const yearMonthTime = getSliceTimestamp(update_time)
      if (!grouped[yearMonthTime]) {
        grouped[yearMonthTime] = {
          hard: 0,
          medium: 0,
          easy: 0
        }
      }
      const groupedInfo = grouped[yearMonthTime]
      const cate = difficulty.toLowerCase()
      
      if (groupedInfo[cate] !== undefined) {
        groupedInfo[cate] += 1
      }

      return grouped
    }, {})

    const monthGroupedInfos = Object.keys(groupedByDateMap).map(time => ({
      time: parseInt(time) * 1000,
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

  async getTodayProblems() {
    const { ctx } = this
    const [start, end] = [formatTime(0), formatTime(24)].map(t => new Date(getTimestamp(t) * 1000))
    const problems = await ctx.service.problem.findByTimeRange(start, end)
  
    ctx.body = problems
  }
}

module.exports = ProblemController