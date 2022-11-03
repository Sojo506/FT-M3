var fs = require("fs");
var http = require("http");

// Escribí acá tu servidor

http
  .createServer(function (req, res) {
    res.writeHead(404, { "Content-Type": "text/plain" });
    if(req.url === '/') {
      res.end('Hola')
    }else {
      fs.readFile(`./images${req.url}.jpg`, (err, data) => {
        if(err) {
          res.end('Image not fount');
        }else {
          res.writeHead(200, { "Content-Type": "image/jpeg" });
          res.end(data)
        }
      })
    }
    console.log(req.url)
    
  })
  .listen(1337, "127.0.0.1");
