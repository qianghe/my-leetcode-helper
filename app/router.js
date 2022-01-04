
module.exports = app => {
  // api
  // app.get('/api/problem/byMonths', app.controller.problem.byMonths)
  // app.get('/api/problem/byDate', controller.problem.byMonths)
  // app.get('/api/user/info', app.controller.user.info)
  // app.get('/api/commit/byDate', app.controller.commit.byDate)
  // 同步数据
  app.get('/api/sync', app.controller.sync.syncData)
  // 获取所有题目
  app.get('/api/problems/all', app.controller.problem.getAllProblemByTimeRange)
  // 获取已完成题目的分类
  app.get('/api/problem/group', app.controller.problem.getGroupedProblems)
  // 获取当日提交logs
  app.get('/api/commit/today', app.controller.commit.getTodyLogs)
  
  // static html
  app.get('/(.*?)', app.controller.app.index);
};
