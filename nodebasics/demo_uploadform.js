var http = require("http");

http.createServer((req, res) => {
    res.writeHead(200, {"Content-Type": "html/text"});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
  res.write('</form>');
  return res.end();
}).listen(8080);
