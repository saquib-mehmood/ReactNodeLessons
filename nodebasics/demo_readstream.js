var http = require('http');
var fs = require ('fs');

var rs = fs.createReadStream('./demofile.txt');
    rs.on('open', () => {
    console.log('The file is open');
});

