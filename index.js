const express = require('express');
const morgan = require('morgan');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

const { createProxyMiddleware } = require('http-proxy-middleware');
const routeTable = require('./routeTable');

// Create Express Server
const app = express();

// Config
const config = JSON.parse(fs.readFileSync('./config.json'));
const PORT = config.port;
const HOST = config.host;

// Route Table 
let routing = routeTable(config);

// Setup logging
app.use(morgan('dev'));

// Output route table
if(config.showRouteMap) 
    app.get('/route-table',(req,res,next) => res.send(routing));

routing.forEach(item => {

    if(item.type=="url-proxy") {
        app.use(item.source,createProxyMiddleware({
            target: item.target,
            changeOrigin: item.changeOrigin,
            pathRewrite: {
                [item.pathRewrite]: ''
            }
        }));
    }

    if(item.type == "static-file-proxy") {
        console.log("📂 "+chalk.blue(`Serving files at ${item.source} from ${item.target}`));
        app.use(item.source,express.static(item.target));
    }

});

// Authorization
/*
app.use('', (req, res, next) => { if (req.headers.authorization) { next(); } else {res.sendStatus(403); } });*/

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