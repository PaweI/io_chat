var socket = function(io) {

  var lastMessages = []

  io.on('connection', function(socket){
    console.log('Another goose connected'); 
    if(lastMessages.length > 0) {
      lastMessages.forEach(function(message) {
        io.emit('last messages', message)
        console.log(message)
      });
    };

    socket.on('chat message', function(message) {
      io.emit('chat message', message);
      if(lastMessages.length > 12) {
        lastMessages.shift();
        lastMessages.push(message)
      } else {
        lastMessages.push(message)
      };
      // console.log('message: ' + message);
    });
    socket.on('disconnect', function() {
      console.log('They gone :-(');
    });
  });

};

module.exports = socket