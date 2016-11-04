/**
 * Refactoring gods, who art in github, documented be thy variable names.
 * thy code review come, pull request deny's will be done, in master
 * as in the branches. give us this merge, our unit tests, as we forgive
 * those who type tabs instead of spaces, and lead us not into arguments
 * about text editors, but separate our concerns, amen.
 * 
 * # this is a mess.
 * 
 */
var net = require('net');
var client = new net.Socket();

var connect = client.connect.bind(client, 4444, '127.0.0.1');

var connected = false;
var connectCounter = 0;
client.on("error", function(err) {
  if (!connected) {
    setTimeout(function() {
      console.log("connecting again");
      connectCounter++;
      if (connectCounter >= 10)
        throw new Error("Could not find server after 10 tries");
      connect();
    }, 500);
  }
})

client.on("connect", function () {
  console.log("connected again");
  connectCounter = 0;
});

// client.on('data', function () {});  // performance optimization
client.on('close', function () { connected = false; });
client.on('connect', function () { connected = true; });
client.on('drain', function () {});
client.on('end', function () { connected = false; });
client.on('lookup', function () {});
client.on('timeout', function () {});

connect();

client._connect = connect;

module.exports = client;
