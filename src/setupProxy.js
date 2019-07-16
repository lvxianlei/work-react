const proxy = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    proxy('/oauth/token', {
      target: "http://t.50-jia.com:8099/",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/common/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/workflow/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/k3/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/customer/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/project/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/call-center/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/xms/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/product/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/discount/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/sales/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/case/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/api-user/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/logs/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/design/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
  app.use(
    proxy('/financial/', {
      target: "http://t.50-jia.com",
      changeOrigin: true
    })
  );
}