var rest = require("restify");
var readline = require('readline');

var rl = readline.createInterface({
  input : process.stdin,
  output : process.stdout
});

var client = rest.createJsonClient({
  url: "http://localhost:3000"
});

var loop = function() {
  rl.question('What string do you want parsed? ', (string) => {
    client.post('/api', { str : string }, function(err, req, res, obj) {
      console.log(obj);
      loop();
    });
  });
};
loop();
