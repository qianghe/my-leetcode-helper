const Service = require('egg').Service
const { GraphQLClient, gql } = require('graphql-request')

const cookieVal = 'LEETCODE_SESSION=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfYXV0aF91c2VyX2lkIjoiNzI3NDI0IiwiX2F1dGhfdXNlcl9iYWNrZW5kIjoiYWxsYXV0aC5hY2NvdW50LmF1dGhfYmFja2VuZHMuQXV0aGVudGljYXRpb25CYWNrZW5kIiwiX2F1dGhfdXNlcl9oYXNoIjoiNTc5YWM2YzcxZWZhODA4NjgzNzgzNDI5YTFmYzQ1YjlkMDMyNmI5NCIsImlkIjo3Mjc0MjQsImVtYWlsIjoiaHFpc3dvbmRlckBnbWFpbC5jb20iLCJ1c2VybmFtZSI6ImNoZWVyeVFIIiwidXNlcl9zbHVnIjoiY2hlZXJ5UUgiLCJhdmF0YXIiOiJodHRwczovL2Fzc2V0cy5sZWV0Y29kZS5jb20vdXNlcnMvcWlhbmdoZS9hdmF0YXJfMTU2MTk5MDc4My5wbmciLCJyZWZyZXNoZWRfYXQiOjE2NDEzOTQzMDQsImlwIjoiNTAuNy4yNTIuNzgiLCJpZGVudGl0eSI6ImI4OTM4ZmRkOGNhMzY5YzY5YzQ2ZTc3MzgwYjUzNGYyIiwic2Vzc2lvbl9pZCI6MTQ3MzM0Mzl9.m2MGSDRGNYw0iomBLWqy2ljRzJiztOb31ywXHgAgE4o;csrftoken=IQKEVcFy9kI7msIjOzV4AessleJmNEgMe3NNPGW0hdm9EvvXZ2pugIOVmVy0VEU;'

class LeetcodeService extends Service {
  // 获取commitLosg
  async getCommitLogs(offset) {
		const ctx = this.ctx
		const result = await ctx.curl(`https://leetcode.com/api/submissions/?offset=${offset}&limit=20`, {
      dataType: 'json',
			headers: {
				'Cookie': cookieVal
			}
    });
		return result.data.submissions_dump || []
	}
  // 获取question详情
  async getQuestionDetail(titleSlug) {
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
		
		// Overrides the clients headers with the passed values
		const data = await client.request(query, variables)
		return data
  }
}

module.exports = LeetcodeService