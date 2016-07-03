/**
 * server.js
 * @task - Launches a koa-server.
 * By default, serves the directory specified in `gulp/config`. Called from 'gulp'
 */
const koa = require('koa');
const app = koa();
const serve = require('koa-static');

const config = require('../config').server;

app.use(serve(config.destinationPath));
app.listen(process.env.PORT || config.port);