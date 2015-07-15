// YOUR CODE HERE:
var app = {
   server:'https://api.parse.com/1/classes/chatterbox',
}

app.init = function(){
   app.fetch();
};


app.send = function(message){
   $.ajax({
     // This is the url you should use to communicate with the parse API server.
     url: 'https://api.parse.com/1/classes/chatterbox',
     type: 'POST',
     data: JSON.stringify(message),
     contentType: 'application/json',
     success: function (data) {
       console.log('chatterbox: Message sent');
     },
     error: function (data) {
       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
       console.error('chatterbox: Failed to send message');
     }
   });
};

app.fetch = function(message){
   $.ajax({
     // This is the url you should use to communicate with the parse API server.
     url: 'https://api.parse.com/1/classes/chatterbox',
     type: 'GET',
     data: JSON.stringify(message),
     contentType: 'application/json',
     success: function (data) {
       console.log('chatterbox: Message received');
       var info = data.results;
       for(var i = 0; i < 10; i++){
         $('#chats').append('<div class="message">' + info[i].username + '<br>'+'<br>' + info[i].text + '</div>');
       }
     },
     error: function (data) {
       // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
       console.error('chatterbox: Failed receive message');
     }
   });
};

app.addMessage = function(message){
   var user = message.username;
   var text = message.text;
   var room = message.roomname;
   $('#chats').append('<div class="message">' + user + text + room +'</div>') 
};

app.clearMessages = function(){
   var chat = $('#chats').empty()
};

app.addFriend = function(){};

app.addRoom = function(){
   $('#roomSelect').append('<div class="room">' + this.room + '</div>')
};

app.handle = function(text, username){
   var obj = {
      text : text,
      username : username
   }
   app.send(obj);
}

$(document).ready(function(){
   app.init();
//sends username and message when button is clicked
   $('.addMessage').on('click', function(){
      var speak = $('.input').val();
      var user = $('.username').val();
      app.handle(speak, user);
   });

   // setInterval(function () {
   //     app.fetch();
   // console.log('Refreshing')
   //   }, 3000);

   $('.reload').on('click', function(){
      app.clearMessages();
      app.fetch();
   })
})
