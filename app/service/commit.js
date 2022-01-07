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
    const res = await this.ctx.model.Commit
      .find()
      .sort({ "commit_time": -1 })
      .limit(1)

    return res && res[0]
  }
}

module.exports = CommitService