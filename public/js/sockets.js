$(document).ready(function() {
  var socket = io();

  socket.on('last messages', function(message) {
    $('#messages').append($('<li>').text(message));
  });


  var chat = function(username) {

    $('#messageInput').fadeIn();

    $('#messageInput').submit(function() {
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;
    });

    socket.on('chat message', function(message) {
      $('#messages').append($('<li>').text(username + '=> ' + message));
      $.when('#messages li:nth-child(20)').then(function() {
        $('#messages li:nth-child(1)').remove();
      });
    });

  };

  $('#username').submit(function(event) {
    event.preventDefault();
    var username = $('#name').val();
    $('#username').fadeOut();
    $('#messages').fadeIn();
    chat(username);
  });
});