
module.exports = app => {
  // api
  // app.get('/api/problem/byMonths', app.controller.problem.byMonths)
  // app.get('/api/problem/byDate', controller.problem.byMonths)
  // app.get('/api/user/info', app.controller.user.info)
  // app.get('/api/commit/byDate', app.controller.commit.byDate)
  app.get('/api/sync', app.controller.data.sync)
  // static html
  app.get('/(.*?)', app.controller.app.index);
};
