const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const os=require("os");
const networkInterfaces=os.networkInterfaces();
const path = require('path');

const app = express();
const config = require('./webpack.dev.js');
const compiler = webpack(config);
const proxy = require('express-http-proxy');
var mockjs = require('express-mockjs')

// Tell express to use the webpack-dev-middleware and use the webpack.config.js
// configuration file as a base.

app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}));
app.use(webpackHotMiddleware(compiler));

//添加接口，自定义测试数据
app.use('/mapi', mockjs(path.join(__dirname, '../mock')));

app.listen(9191, function () {
  console.log('app listening on port 9191!\n');
});