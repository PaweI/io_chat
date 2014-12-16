$(document).ready(function() {
  var socket = io();

  var chat = function(username) {

    socket.on('joined room', function (username, connectedUsers) {
      $('#messages').append($('<li>').text(username + " walked in to the room"));
      $('#users li').remove();
      connectedUsers.forEach(function(user) {
        $('#users').append($('<li>').text(user));
      });
    });

    $('#messageInput').fadeIn();

    $('#messageInput').submit(function() {
      socket.emit('chat message', $('#message').val());
      $('#message').val('');
      return false;
    });

    socket.on('user send message', function(username, message) {
      if(username === $('#name').val()) {
        $('#messages').append($('<li>').text('You' + ' => ' + message));
      } else {
        $('#messages').append($('<li>').text(username + ' => ' + message));
      };
      // $.when('#messages li:nth-child(20)', function() {
      //   $('#messages li:nth-child(1)').remove();
      // });
    });

    socket.on('left room', function (username, connectedUsers) {
      $('#messages').append($('<li>').text(username + " runned away from the room"));
      $('#users li').remove();
      connectedUsers.forEach(function(user) {
        $('#users').append($('<li>').text(user));
      });
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