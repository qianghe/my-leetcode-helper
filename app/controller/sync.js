const Controller = require('egg').Controller

class SyncController extends Controller {
  async syncData() {
    const { ctx } = this
		let offset = 0
		let requestDone = false
		const { startTime, endTime } = ctx.query

		while(!requestDone) {
			const commits = await ctx.service.leetcode.getCommitLogs(offset)
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
			// 同步logs数据库
			ctx.serive.commit.add(logs)
		
			const resolvedProblems = new Set()
			const slug2LogCommitTimeMap = {}
			
			logs.forEach(log => {
				const { ['title_slug']: titleSlug, status } = log.detail
				if (status === 1) {
					resolvedProblems.add(titleSlug)
					slug2LogCommitTimeMap[titleSlug] = log.commitTime
				}
			})
		
			// 2. done problems
			const graphqlRes = await Promise.all([...resolvedProblems].map(titleSlug => {
				return ctx.service.leetcode.getQuestionDetail(titleSlug)
			}))
			const problems = graphqlRes.map(({ question }) => {
				const { topicTags, questionId, titleSlug, ...restProps } = question
				return {
					tags: topicTags,
					leetcode_id: questionId,
					slug: titleSlug,
					update_time: slug2LogCommitTimeMap[restProps.titleSlug],
					...restProps,
				}
			})
			// problems 同步数据库
			ctx.serive.problem.add(problems)
			
			requestDone = logs.length === 0
			offset += 20
		}
				
		ctx.body = []
  }
}

module.exports = SyncController
