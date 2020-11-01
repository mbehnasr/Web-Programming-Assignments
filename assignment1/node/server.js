const http = require("http");
const { SHA256, Write } = require("./funcs");

const port = 8070;

const server = http.createServer((req, res) => {
  if (req.url === "/node/sha256" || req.url === "/node/sha256/") {
    SHA256(req, res);
  } else if (req.url.search(/\/node\/write[^\/]*/) === 0) {
    Write(req, res);
  } else {
    res.statusCode = 404;
    res.end("404");
  }
});

server.listen(port);
