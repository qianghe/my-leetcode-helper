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

    const res = await this.ctx.model.Commit.find(search)
    return res
  }

  async findLatestCommit() {
    if(!this.ctx.model.Commit) return null
    const res = await this.ctx.model.Commit.find()
    return res
  }
}

module.exports = CommitService