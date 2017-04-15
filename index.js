var rest = require("restify");
var fs = require("fs");
var pegjs = require("pegjs");

var grammar = fs.readFileSync("searchgrammar.pegjs").toString();
var parser = pegjs.generate(grammar);
var parseResult = parser.parse(">=!(\"abba bbabaab\")");
var parseResult = parser.parse('="TEST DATA" OR >len(9)');
console.log(JSON.stringify(parseResult, null, ' '));

const server = rest.createServer({
  name : 'myapp',
  version : '1.0.0'
});

server.get('/api/get', function(req, res, next) {
  res.send({ hello : "hello" });
  next();
});

server.get('/api/get/:name', function(req, res, next) {
  res.send({ hello : req.params.name });
  next();
});

server.listen(3000);
