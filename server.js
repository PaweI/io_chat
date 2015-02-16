var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var session = require('express-session');
var socket = require('./src/socketController.js')(io, session);


app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

app.get('/', function(request, result) {
  result.render('index');
});

server.listen(process.env.PORT || 3000, function() {
  console.log('listening on port:3000');
});
