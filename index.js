var rest = require("restify");

const server = rest.createServer({
  name : 'myapp',
  version : '1.0.0'
});

server.get('/api/get', function(req, res, next) {
  res.send({ hello : "hello" });
  next();
});

server.listen(3000);
