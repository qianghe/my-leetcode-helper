const path = require('path')

module.exports = {
  target: 'web',
  entry: {
    app: 'app/web/page/index.jsx'
  },
  alias: {
    app: path.join(__dirname, './app'),
    web: path.join(__dirname, './app/web')
  }
};