const path = require('path');
const fs = require('fs');
module.exports = app => {
  const exports = {
    // ecurity: {
    //   csrf: {
    //     enable: false,
    //   },
    // },
  };

  exports.siteFile = {
    '/favicon.ico': fs.readFileSync(path.join(app.baseDir, 'app/web/asset/images/favicon.ico'))
  };

  exports.logger = {
    consoleLevel: 'DEBUG',
    dir: path.join(app.baseDir, 'logs')
  };

  exports.static = {
    prefix: '/public/',
    dir: path.join(app.baseDir, 'public')
  };

  exports.keys = '123456';

  exports.middleware = [
    'access'
  ];

  exports.reactssr = {
    layout: path.join(app.baseDir, 'app/web/view/layout.html')
  };

  // exports.mongoose = {
  //   client: {
  //     url: 'mongodb://127.0.0.1/leetcode',
  //     options: {},
  //     // mongoose global plugins, expected a function or an array of function and options
  //     plugins: [],
  //   },
  // };

  return exports;
};
