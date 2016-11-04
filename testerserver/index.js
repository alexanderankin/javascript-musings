var net = require('net');
// var sleep = require('sleep');

var server = net.createServer();

var firstconnection = false;
server.on('connection', function (socket) {
  if (firstconnection) {
    throw new Error("Multiple Connections");
  }

  socket.on('data', function (chunk) {
    process.stdin.once("data", socket.write.bind(socket, chunk.toString()));
    // socket.write(chunk.toString());
  });
});

server.listen(8080);
