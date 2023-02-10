# Node.js Basics

### 1. Node as Web Server

The HTTP module can create an HTTP server that listens to server ports and gives a response back to the client.
Use the createServer() method to create an HTTP server:

The function passed into the http.createServer() method, will be executed when someone tries to access the computer on port 8080.

Save the code above in a file called "demo_http.js", and initiate the file: node demo_http.js
Open browser: http://localhost:8080
Hello World

### Add an HTTP Header

If the response from the HTTP server is supposed to be displayed as HTML, you should include an HTTP header with the correct content type:

- res.writeHead(200, {'Content-Type': 'text/html'});

The first argument of the res.writeHead() method is the status code, 200 means that all is OK, the second argument is an object containing the response headers.

### 3. Read the Query String

The function passed into the http.createServer() has a req argument that represents the request from the client, as an object (http.IncomingMessage object).

This object has a property called "url" which holds the part of the url that comes after the domain name:

Create a file called "demo_http_url.js" and initiate the file:

node demo_http_url.js

http://localhost:8080/summer
=> summer

http://localhost:8080/winter
=> winter

### 4. Split the Query String

There are built-in modules to easily split the query string into readable parts, such as the URL module.
Create a file called "demo_querystring.js" and initiate the file:

node demo_url_querystring.js

http://localhost:8080/?year=2017&month=July
=> 2017 July

## Node.js File System Module

The Node.js file system module allows you to work with the file system on your computer.

### 1. Read Files

The fs.readFile() method is used to read files on your computer.
Assume we have the following HTML file (located in the same folder as Node.js):

<html>
<body>
<h1>My Header</h1>
<p>My paragraph.</p>
</body>
</html>

Create a Node.js file that reads the HTML file, and return the content.

node demo_readfile.js

### 2. Create Files

#### fs.appendfile()

The fs.appendFile() method appends specified content to a file. If the file does not exist, the file will be created.

#### fs.open()

The fs.open() method takes a "flag" as the second argument, if the flag is "w" for "writing", the specified file is opened for writing. If the file does not exist, an empty file is created.

#### fs.writeFile()

The fs.writeFile() method replaces the specified file and content if it exists. If the file does not exist, a new file, containing the specified content, will be created.

### Update Files

#### fs.appendFile()

The fs.appendFile() method appends the specified content at the end of the specified file.

Create a file demo_appendfile1.js and Append "This is my text MORONS!" to the end of the file "mynewfile1.txt"

#### fs.writeFile()

The fs.writeFile() method replaces the specified file and content.
Create a file demo_writefile1.js and replace the content of the file "mynewfile3.txt".

### Delete Files

To delete a file with the File System module, use the fs.unlink() method.

The fs.unlink() method deletes the specified file.
Create a file demo_unlink.js and Delete "mynewfile2.txt".

### Rename Files

#### To rename a file with the File System module, use the fs.rename() method.

The fs.rename() method renames the specified file.

Create a file demo_rename.js and Rename "mynewfile1.txt" to "myrenamedmoronfile.txt"

### Upload Files (Formidable)

There is a very good module for working with file uploads, called "Formidable".

The Formidable module can be downloaded and installed using NPM:
npm install formidable

After you have downloaded the Formidable module, you can include the module in any application.
var formidable = require("formidable");

#### Step 1: Create an Upload Form

Create a Node.js file demo_uploadform that writes an HTML form, with an upload field.

var http = require('http');

http.createServer(function (req, res) {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
res.write('<input type="file" name="filetoupload"><br>');
res.write('<input type="submit">');
res.write('</form>');
return res.end();
}).listen(8080);

Step 2: Parse the Uploaded File

Include the Formidable module in the demo_uploadform.js file and create a new file demo_uploadparse.js to be able to parse the uploaded file once it reaches the server.

When the file is uploaded and parsed, it gets placed on a temporary folder on your computer.

var http = require('http');
var formidable = require('formidable');

http.createServer(function (req, res) {
if (req.url == '/fileupload') {
var form = new formidable.IncomingForm();
form.parse(req, function (err, fields, files) {
res.write('File uploaded');
res.end();
});
} else {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
res.write('<input type="file" name="filetoupload"><br>');
res.write('<input type="submit">');
res.write('</form>');
return res.end();
}
}).listen(8080);

node demo_uploadparse.js

#### Step 3: Save the File

When a file is successfully uploaded to the server, it is placed on a temporary folder.

The path to this directory can be found in the "files" object, passed as the third argument in the parse() method's callback function.

To move the file to the folder of your choice, use the File System module, and rename the file:

Create a file demo_uploadfile by including fs module to the demo_uploadparse.js file and move the file to the current folder.

var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
if (req.url == '/fileupload') {
var form = new formidable.IncomingForm();
form.parse(req, function (err, fields, files) {
var oldpath = files.filetoupload.filepath;
var newpath = 'C:/Users/Your Name/' + files.filetoupload.originalFilename;
fs.rename(oldpath, newpath, function (err) {
if (err) throw err;
res.write('File uploaded and moved!');
res.end();
});
});
} else {
res.writeHead(200, {'Content-Type': 'text/html'});
res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
res.write('<input type="file" name="filetoupload"><br>');
res.write('<input type="submit">');
res.write('</form>');
return res.end();
}
}).listen(8080);

## URL Module

The URL module splits up a web address into readable parts.

To include the URL module, use the require() method:
var url = require('url');

### url.parse()

Parse an address with the url.parse() method, and it will return a URL object with each part of the address as properties.
Create a file demo_urlparse.js and parse the url:
'http://localhost:8080/default.htm?year=2017&month=february'

### Node.js Fileserver

We can combine query string and file server and serve the files to the client.

Create two files summer.html and winter.html and serve them to the client.

Create a Node.js file demo_fileserver.js that opens the requested file and returns the content to the client. If anything goes wrong, throw a 404 error.

http://localhost:8080/summer.html
=> Summer
I love the sun!

http://localhost:8080/winter.html
=> Winter
I love the snow!

### Node.js NPM

NPM is a package manager for Node.js packages, or modules.
www.npmjs.com hosts thousands of free packages to download and use. The NPM program is installed on your computer when you install Node.js.

A package in Node.js contains all the files you need for a module.Modules are JavaScript libraries you can include in your project.

If you want to download a package called "upper-case":
npm install upper-case. NPM creates a folder named "node_modules", where the package will be placed.

Once the package is installed, it is ready to use:
var uc = require('upper-case');

Create a Node.js file demo_uppercase.js that will convert the output "Hello World!" into upper-case letters.

### Node.js Events

Node.js is perfect for event-driven applications.
Every action on a computer is an event. Like when a connection is made or a file is opened.
Objects in Node.js can fire events, like the readStream object fires events when opening and closing a file.

Create a file demo_readstream.js which fires an event while opening a file.

#### Events Module

Node.js has a built-in module, called "Events", where you can create-, fire-, and listen for- your own events.

To include the built-in Events module use the require() method. In addition, all event properties and methods are an instance of an EventEmitter object. To be able to access these properties and methods, create an EventEmitter object:

var events = require('events');
var eventEmitter = new events.EventEmitter();

You can assign event handlers to your own events with the EventEmitter object.

In the example below we have created a function that will be executed when a "scream" event is fired.

To fire an event, use the emit() method.

### Node.js Send Email (Nodemailer module)

The Nodemailer module makes it easy to send emails from your computer.

The Nodemailer module can be downloaded and installed using npm:
npm install nodemailer

After you have downloaded the Nodemailer module, you can include the module in any application:

var nodemailer = require('nodemailer');

Use the username and password from your selected email provider to send an email.
