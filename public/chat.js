//var port = process.env.port || 4000;

// Make connection
var socket = io.connect('http://localhost:8081');

function timestamp(){
  var time = Math.round(new Date().getTime() /1000);
  return time;
}

function theTime(){
  var d = new Date();
  var time = d.getHours()+':'+d.getMinutes()+':'+d.getSeconds();

  return time;
}


// Query DOM
var message = document.getElementById('message'),
      handle = document.getElementById('handle'),
      btn = document.getElementById('send'),
      output = document.getElementById('output'),
      feedback = document.getElementById('feedback');

// Emit events
btn.addEventListener('click', function(){
    socket.emit('chat', {
        message: message.value,
        handle: handle.value,
        theTime: theTime()
    });
    message.value = "";
});

message.addEventListener('keyup', function(){

    if(event.keyCode === 13){
      event.preventDefault();
      btn.click();
    }

    socket.emit('typing', {
      message: message.value,
      handle: handle.value,
      timestamp: timestamp()
    })
});

// Listen for events
socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + '('+data.theTime+'): </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    if(data.message == ""){
      startTime = '';
      feedback.innerHTML = '';
    }else{
      feedback.innerHTML = '<p><em>' + data.handle + ' is typing a message...</em></p>';
    }

});
