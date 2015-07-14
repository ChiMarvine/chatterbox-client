// YOUR CODE HERE:
var app = {
   server:'https://api.parse.com/1/classes/chatterbox',
}

app.init = function(){};

$('.reload').on('click', function(){
   app.fetch();
})

app.send = function(message){
   $.ajax({
     // This is the url you should use to communicate with the parse API server.
     url: 'https://api.parse.com/1/classes/chatterbox',
     type: 'POST',
     data: JSON.stringify(message),
     contentType: 'application/json',
     success: function (data) {
       console.log('chatterbox: Message sent' + JSON.stringify(data) + console.dir(data));
       app.addMessage(data);
       $('#chats').append('<div class="message">' + data.createdAt + data.objectId + '</div>')
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
       console.log('chatterbox: Message received' + console.log(data));
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

   $('.addMessage').on('click', function(){
      $('.input').val().append('<div class="message">'+ text +'</div>')
   })
};

app.clearMessages = function(){
   var chat = $('#chats').empty()
};

app.addFriend = function(){};

app.addRoom = function(){
   $('#roomSelect').append('<div class="room">' + this.room + '</div>')
};
