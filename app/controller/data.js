const Controller = require('egg').Controller
const { GraphQLClient, gql } = require('graphql-request')

const cookieVal = 'LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNzI3NDI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNTc5YWM2YzcxZWZhODA4NjgzNzgzNDI5YTFmYzQ1YjlkMDMyNmI5NCIsImlkIjo3Mjc0MjQsImVtYWlsIjoiaHFpc3dvbmRlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNoZWVyeVFIIiwidXNlcl9zbHVnIjoiY2hlZXJ5UUgiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvcWlhbmdoZS9hdmF0YXJfMTU2MTk5MDc4My5wbmciLCJyZWZyZXNoZWRfYXQiOjE2NDAyNzExMTcsImlwIjoiNTAuNy4yNTIuNzgiLCJpZGVudGl0eSI6ImI4OTM4ZmRkOGNhMzY5YzY5YzQ2ZTc3MzgwYjUzNGYyIiwic2Vzc2lvbl9pZCI6MTQ3MzM0Mzl9.6MZXRpTy4BpkzXQ80gxZxFaW8xIIIwPxOdzolvWbLQ8;csrftoken=IQKEVcFy9kI7msIjOzV4AessleJmNEgMe3NNPGW0hdm9EvvXZ2pugIOVmVy0VEU;'
class DataController extends Controller {
  async syncData() {
    const { ctx } = this
		let offset = 0
		let requestDone = false
		const { startTime, endTime } = ctx.query

		while(!requestDone) {
			const commits = await this.getCommitLogs(offset)
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
				return this.getProblemDetail(titleSlug)
			}))
			// problems 同步数据库

			requestDone = logs.some(({ commit_time: commitTime }) => commitTime < startTime)
			offset += 20
		}
				
		ctx.body = []
  }

	async getProblemDetail(titleSlug) {
		const endpoint = 'https://leetcode.com/graphql'
		const client = new GraphQLClient(endpoint)

		const query = gql`
			query questionData($titleSlug: String!) {
				question(titleSlug: $titleSlug) {
						questionId
						title
						titleSlug
						difficulty
						topicTags {
							name
							slug
						}
				}
			}
		`
		
		const variables = {
			titleSlug
		}
		
		// const requestHeaders = {
		// 	authorization: 'Bearer MY_TOKEN'
		// }
		
		// Overrides the clients headers with the passed values
		const data = await client.request(query, variables)
		console.log('data', data)
		return data
	}

	async getCommitLogs(offset) {
		const ctx = this.ctx
		const result = await ctx.curl(`https://leetcode.com/api/submissions/?offset=${offset}&limit=20`, {
      dataType: 'json',
			headers: {
				'Cookie': cookieVal
			}
    });

		return result.data
	}
}

module.exports = DataController
