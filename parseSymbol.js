const chalk = require('chalk');
const path = require('path');
const fs = require('fs');

module.exports = function(_string) {

    if(_string.includes('@')) {
        return _string.replace('^',path.parse(__dirname).dir);
    }

    if(_string.includes('~')) {
        return _string.replace('~',process.env.HOME);
    }

    if(_string.includes('^')) {
        let item = path.parse(__dirname);
        return  _string.replace('^',item.dir+"/"+item.base);   
    }

    return _string;
}