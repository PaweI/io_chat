var socket = function(io, session) {

  var connectedUsers = []

  io.on('connection', function(socket){
    console.log('Another goose connected'); 
    socket.on('username', function(username) {

      connectedUsers.push(session.user)
      io.emit('joined room', username)

      socket.on('chat message', function(message) {
        io.emit('user send message', username, message);
      });

      socket.on('disconnect', function() {
        io.emit('left room', username);
        console.log('They gone :-(');
      });
    });
  });

};

module.exports = socket;