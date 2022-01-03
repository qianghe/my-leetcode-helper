const Controller = require('egg').Controller

class CommitController extends Controller {
  async getCommitsByDate() {
    const { ctx } = this
    const commits = await ctx.service.commit.find()
    
		ctx.body = commits
  }
}

module.exports = CommitController