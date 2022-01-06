const Controller = require('egg').Controller
const { formatTime, nextTime, getTimestamp } = require('../util')
class SyncController extends Controller {
	/**
	 * startTime:
	 * 	1. log中最近的一条记录;
	 *  2. user中的start_time;
	 *  3. 当天的0:00
	 * endTime: 当天的24:00
	 */
  async syncData() {
    const { ctx } = this
		let offset = 0
		let requestDone = false

		const { userName } = ctx.query
		const { startTime, endTime } = await this.getSyncTimeRange(userName)
		while(!requestDone) {
			const commits = await ctx.service.leetcode.getCommitLogs(offset)
			// 同步数据
			// 1. commit logs
			const logs = commits.map((item) => {
				return {
					raw_id: item.id,
					status: item['status_display'] === 'Accepted' ? 1 : 0,
					commit_time: item.timestamp * 1000,
					detail: item
				}
			}).filter(({ commit_time: commitTime }) => {
				const limitTime = commitTime / 1000
				return limitTime >= startTime && limitTime <= endTime
			})
			// 同步logs数据库
			ctx.service.commit.add(logs)
		
			const resolvedProblems = new Set()
			const slug2LogCommitTimeMap = {}
			
			logs.forEach(log => {
				const { ['title_slug']: titleSlug } = log.detail
				if (log.status) {
					resolvedProblems.add(titleSlug)
					slug2LogCommitTimeMap[titleSlug] = log['commit_time']
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
					update_time: slug2LogCommitTimeMap[titleSlug],
					...restProps,
				}
			})
			// problems 同步数据库
			ctx.service.problem.add(problems)
			
			requestDone = logs.length === 0
			console.log('requestDone!!!!!', requestDone, offset)
			offset += 20
		}
				
		ctx.body = []
  }

	async getSyncTimeRange(username) {
		const endTime = getTimestamp(formatTime(24))
		let startTime = getTimestamp(formatTime(0))
		const { ctx } = this
		
		const commit = ctx.service.commit.findLatestCommit()
		if (commit && commit['commit_time']) {
			const time = commit['commit_time']
			startTime = getTimestamp(nextTime(time))
		} else {
			const user = await ctx.service.user.findOneByUserName(username)

			if (user && user['start_time']) {
				startTime = getTimestamp(user['start_time'])
			}
		}
		
		return {
			startTime,
			endTime
		}
	}
}

module.exports = SyncController
