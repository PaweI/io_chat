$(document).ready(function() {
  var socket = io();
  var currentUser;

  socket.on('last messages', function(message) {
    $('#messages').append($('<li>').text(message));
  });


  var chat = function(username) {

    socket.on('joined room', function (username) {
      $('#messages').append($('<li>').text(username + " walked in to the room"));
    });

    $('#messageInput').fadeIn();

    $('#messageInput').submit(function() {
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;
    });

    socket.on('user send message', function(user, message) {
      $('#messages').append($('<li>').text(user + ' => ' + message));
      // $.when('#messages li:nth-child(20)', function() {
      //   $('#messages li:nth-child(1)').remove();
      // });
    });

    socket.on('left room', function (username) {
      $('#messages').append($('<li>').text(username + " runned away from the room"));
    });

  };

  $('#username').submit(function(event) {
    event.preventDefault();
    socket.emit('username', $('#name').val())
    $('#username').fadeOut();
    $('#messages').fadeIn();
    chat(username);
  });
});