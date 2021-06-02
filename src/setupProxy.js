const createProxyMiddleware = require('http-proxy-middleware');


module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://121.145.133.119:3001',
      changeOrigin: true
    })
  );
};