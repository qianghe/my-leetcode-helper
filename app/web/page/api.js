import axios from 'axios'

// 同步数据
export const syncDBRequest = (userName) =>
	axios.get(`/api/sync?userName=${userName}`, {
		timeout: 0
	})

// 获取userInfo
export const getUserGoalRequest = (userName) => 
	axios.get(`/api/user/goal?userName=${userName}`)

// 获取分组数据
export const getGroupedQuesByMonthRequest = () => axios.get('/api/problems/byMonth')


// 获取当前的commit记录
export const getTodayCommitRequest = () => axios.get('/api/commit/today')

// 获取当日的题目
export const getTodayProblemRequest = () => axios.get('/api/problem/today')

// 获取题目分类
export const getGroupedSet = () => axios.get('/api/problem/group')