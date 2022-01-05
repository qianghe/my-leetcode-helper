const Controller = require('egg').Controller
const { formatTime } = require('../util')

class CommitController extends Controller {
  async getCommitsByDate(start, end) {
    const commits = await ctx.service.commit.findByTimeRange(start, end)
    
		ctx.body = commits
  }

  async getTodyLogs() {
    const [start, end] = [formatTime(0), formatTime(24)] 
    const logs = await this.getCommitsByDate(start, end)

    return logs
  }
}

module.exports = CommitController