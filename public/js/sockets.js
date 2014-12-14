$(document).ready(function() {
  var socket = io();
  socket.on('last messages', function(message) {
    $('#messages').append($('<li>').text(message));
  });
  $('form').submit(function() {
    socket.emit('chat message', $('#message').val());
    $('#message').val('');
    return false;
  });
  socket.on('chat message', function(message) {
    $('#messages').append($('<li>').text(message));
  });
});