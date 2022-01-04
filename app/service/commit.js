const Service = require('egg').Service

class CommitService extends Service {
  async add(commits) {
    await this.ctx.model.CommitLog.insertMany(commits)
  }

  async findByTimeRange(start, end) {
    const search = {
      'commit_time': {
        $lt: end,
        $gt: start
      }
    }

    await this.ctx.modal.CommitLog.find(search)
  }
}

module.exports = CommitService