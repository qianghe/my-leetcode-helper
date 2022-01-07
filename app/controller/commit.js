const Controller = require('egg').Controller
const { formatTime, getTimestamp } = require('../util')

class CommitController extends Controller {
  async getCommitsByDate(start, end) {
    const { ctx } = this
    const commits = await ctx.service.commit.findByTimeRange(start, end)
    
		return commits
  }

  async getTodayLogs() {
    const { ctx } = this
    const [start, end] = [formatTime(1), formatTime(23)].map(t => new Date(getTimestamp(t) * 1000))
    const logs = await this.getCommitsByDate(start, end)

    ctx.body = logs
  }
}

module.exports = CommitController