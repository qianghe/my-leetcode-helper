const Controller = require('egg').Controller
const moment = require('moment')

const formatTime = (hour = 0) => {
  return moment()
    .set('hour', hour)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
}
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