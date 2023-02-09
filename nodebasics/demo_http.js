var http = require('http');

// Create a server object
http.createServer((req, res) => {
    res.write('Hello World'); // write a response to the client
    res.end(); // end response

}).listen(8080); // server object listens at port 8080
