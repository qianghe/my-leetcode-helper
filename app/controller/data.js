const Controller = require('egg').Controller

class DataController extends Controller {
  async syncData(startTime, endTime) {
    const { ctx } = this
		let offset = 0
		let requestDone = false

		while(!requestDone) {
			const commits = await getCommitLogs(offset)
			const resolvedProblems = new Set()
			// 同步数据
			// 1. commit logs
			const logs = commits.map((item) => {
				return {
					raw_id: item.id,
					status: item['status_display'] === 'Accepted' ? 1 : 0,
					commit_time: item.timestamp,
					detail: item
				}
			}).filter(({ commit_time: commitTime }) => {
				return commitTime >=startTime && commitTime <= endTime
			})
			// logs同步数据库
			logs.forEach(log => {
				const { ['title_slug']: titleSlug } = log
				resolvedProblems.add(titleSlug)
			})
		
			// 2. done problems
			const problems = await Promise.all([...resolvedProblems].map(titleSlug => {
				return getProblemDetail(titleSlug)
			}))
			// problems 同步数据库

			requestDone = logs.some(({ commit_time: commitTime }) => commitTime < startTime)
			offset += 20
		}
				
		ctx.body = problems
  }

	async getProblemDetail(titleSlug) {
		
	}

	async getCommitLogs(offset) {
		const ctx = this.ctx
		const result = await ctx.curl(`https://leetcode.com/api/submissions/?offset=${offset}&limit=20`, {
      dataType: 'json'
    });

		return result
	}
}

module.exports = DataController