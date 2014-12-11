var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, result) {
  result.render('index');
});

io.on('connection', function(socket){
  console.log('Another meat connected');
});

server.listen(3000, function() {
  console.log('listening on port:3000');
});