var restify = require("restify");
var fs = require("fs");
var pegjs = require("pegjs");

var grammar = fs.readFileSync("searchgrammar.pegjs").toString();
var parser = pegjs.generate(grammar, { trace : false });

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
    if (err instanceof TypeError) {
      res.send({ code : "BadRequestError", message : "Request object did not have 'str' property" });
    }
    res.send({ code : "ParseError", message : err.message});
  }
  return next();
});

server.listen(3000);
