var restify = require("restify");
var fs = require("fs");
var pegjs = require("pegjs");

var grammar = fs.readFileSync("searchgrammar.pegjs").toString();
var parser = pegjs.generate(grammar, { trace : false });
// var parseResult = parser.parse(">=!(\"abba bbabaab\")");
var parseResult = parser.parse('="TEST DATA" OR >len(9)');
console.log(JSON.stringify(parseResult, null, ' '));

const server = restify.createServer({
  name : 'search-parse',
  version : '1.0.0'
});

server.use(restify.bodyParser());

server.post('/api', function(req, res, next) {
  try { 
    var result = parser.parse(req.params.str);
    res.send({ result });
  } catch (err) {
    console.log(err);
    if (err instanceof TypeError) {
      res.send({ code : "BadRequestError", message : "Request object did not have 'str' property" });
    }
    res.send({ code : "ParseError", message : err.message});
  }
  return next();
});

server.listen(3000);
