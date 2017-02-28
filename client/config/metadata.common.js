const helpers = require('./helpers');

module.exports = {
  title: 'App',
  baseUrl: '/',
  isDevServer: helpers.isWebpackDevServer()
};
