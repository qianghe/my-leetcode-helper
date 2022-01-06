const Service = require('egg').Service

class CommitService extends Service {
  async add(commits) {
    await this.ctx.model.Commit.insertMany(commits)
  }

  async findByTimeRange(start, end) {
    const search = {
      'commit_time': {
        $lt: end,
        $gt: start
      }
    }

    await this.ctx.model.Commit.find(search)
  }

  async findLatestCommit() {
    if(!this.ctx.model.Commit) return null
    await this.ctx.model.Commit.find()
  }
}

module.exports = CommitService