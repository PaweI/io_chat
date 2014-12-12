var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, result) {
  result.render('index');
});

io.on('connection', function(socket){
  console.log('Another goose connected');
  socket.on('chat message', function(message) {
    io.emit('chat message', message);
    // console.log('message: ' + message);
  });
  socket.on('disconnect', function() {
    console.log('They gone :-(');
  });
});

server.listen(process.env.PORT || 5000, function() {
  console.log('listening on port:3000');
});
