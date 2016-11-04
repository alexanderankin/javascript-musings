var client = require('./socketsingleton');
var ArrayContainer = require('./ArrayContainer');
var Transaction = require('./Transaction');

/*process.stdin.on("data", function (data) {
  console.log('got some data');
  client.once("data", console.log.bind(console));
  client.write(data.toString());
});*/

/** methods are push and shift for FIFO */
var queue = new ArrayContainer(Transaction);

process.stdin.on("data", function _input(buffer) {
  // console.log(arguments);
  var data = buffer.toString();

  var responder = function (err, data) {
    console.log(data);
  };

  var transaction = new Transaction(data, responder);
  if (queue.push(transaction) === 1)
    writeImmediate(transaction.request);
});

function writeImmediate(thing) {
  client.write(thing);
}

client.on("data", function (buffer) {
  var response = buffer.toString();
  var transaction = queue.shift();

  if (transaction)
    transaction.responder(null, response);

  if (queue.length()) {
    client.write(queue.peek().request);
  }
});
