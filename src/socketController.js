var socket = function(io, session) {

  var connectedUsers = []
  var lastMessages = {}

  io.on('connection', function(socket){
    console.log('Another goose connected');

    socket.on('username', function(username) {
      connectedUsers.push(username)
      io.emit('joined room', username, connectedUsers)

      socket.on('chat message', function(message) {
        lastMessages.username = message
        console.log(username + message)
        io.emit('user send message', username, message);
      });

      socket.on('disconnect', function() {
        var index = connectedUsers.indexOf(username);
        connectedUsers.splice(index, 1);
        io.emit('left room', username, connectedUsers);
        console.log('They gone :-(');
      });
    });
  });

};

module.exports = socket;