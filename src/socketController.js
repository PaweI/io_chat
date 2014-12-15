var socket = function(io, session) {

  var connectedUsers = []

  io.on('connection', function(socket){
    console.log('Another goose connected'); 
    socket.on('username', function(username) {
      session.user = username
      connectedUsers.push(session.user)
      socket.emit('joined room', session.user)
    });



    socket.on('chat message', function(message) {
      io.emit('user send message', session.user, message);
      // console.log('message: ' + message);
    });
    socket.on('disconnect', function() {
      var index = connectedUsers.indexOf(session.user);
      io.emit('left room', session.user);
      console.log('They gone :-(');
    });
  });

};

module.exports = socket;