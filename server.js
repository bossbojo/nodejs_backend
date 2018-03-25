const http = require('http');
const config = require('./config.json') 
const app = require('./src/app/app.module');
var api = require('express-api-docs');
const port = process.env.port || config.server.port
const server = http.createServer(app);
//doc for web api
api.generate('./src/app/app.module.js', './src/public/help-page.html');
server.listen(port);