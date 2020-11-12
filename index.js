const express = require('express');
const morgan = require("morgan");
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const { createProxyMiddleware } = require('http-proxy-middleware');

// Create Express Server
const app = express();

// Config
const config = JSON.parse(fs.readFileSync('./config.json'));

const PORT = config.port;
const HOST = config.host;

const API_SERVICE_URL = "http://jsonplaceholder.typicode.com";

// Setup logging
app.use(morgan('dev'));

app.get('/route-table',(req,res,next) => {
    res.send("This is a proxy, please checkout readme.md");
});

Object.keys(config.hostMap).forEach(name => {
    console.log('⚙️  '+chalk.blue('Setting up "'+name+'"'));
    const item = config.hostMap[name];
    console.log(item);
});


// Authorization
/*
app.use('', (req, res, next) => {
    if (req.headers.authorization) { next();
    } else {res.sendStatus(403); }
 });*/

 // Proxy 
 /*app.use('/json_placeholder', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/json_placeholder`]: '',
    },
 }));*/

 // Start the Proxy
app.listen(PORT, HOST, () => {
    console.log('🙉 '+chalk.blue(`Listening on ${HOST}:${PORT}`));
 });