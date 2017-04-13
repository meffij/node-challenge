var rest = require("restify");

var client = rest.createJsonClient({
  url: "http://localhost:3000"
});

client.get('/api/get', function(err, req, res, obj) {
  console.log(JSON.stringify(obj, null, 2));
});
