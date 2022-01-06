
module.exports = app => {
  // api
  // app.get('/api/problem/byMonths', app.controller.problem.byMonths)
  // app.get('/api/problem/byDate', controller.problem.byMonths)
  // app.get('/api/user/info', app.controller.user.info)
  // app.get('/api/commit/byDate', app.controller.commit.byDate)
  // 同步数据
  app.get('/api/sync', app.controller.sync.syncData)

  // 获取当前目标
  app.get('/api/user/goal', app.controller.user.getUserGoalInfo)
  // 获取所有题目
  app.get('/api/problems/byMonth', app.controller.problem.getAllProblemByMonth)
  // 获取已完成题目的分类
  app.get('/api/problem/group', app.controller.problem.getGroupedProblems)
  // 获取当日的题目
  app.get('/api/problem/today', app.controller.problem.getTodayProblems)
  // 获取当日提交logs
  app.get('/api/commit/today', app.controller.commit.getTodayLogs)
  // static html
  app.get('/(.*?)', app.controller.app.index);
};
