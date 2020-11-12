const chalk = require('chalk');
const parseSymbol = require('./parseSymbol');

module.exports = function(config) {

    let routeTable = [];

    // Generate route table
    Object.keys(config.hostMap).forEach(name => {

    console.log('⚙️  '+chalk.blue('Setting up "'+name+'"'));
    const item = config.hostMap[name];
    
    if(item.destination.substr(0,4)=='http') {

        routeTable.push({
            source: item.source,
            target: item.destination,
            changeOrigin: true,
            type: "url-proxy",
            pathRewrite: `^${item.source}`,
        });

    } else {

        routeTable.push({
            source: item.source,
            target: parseSymbol(item.destination),
            changeOrigin: true,
            type: "static-file-proxy",
        });
    }

    });

    return routeTable;    
}