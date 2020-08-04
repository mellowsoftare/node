// Make connection
const socket = io.connect('http://localhost:4000');
var startTime = '';

function timestamp(){
  var time = Math.round(new Date().getTime() / 1000);
}

function theTime(){
  var d = new Date();
  var time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();

  return time;
}

//Query DOM
var message = document.getElementById('message');
    handle = document.getElementById('handle');
    btn = document.getElementById('send');
    output = document.getElementById('output');
    feedback = document.getElementById('feedback');


//Emit EVENTS

//send message when btn is clicked
btn.addEventListener('click', () => {
  socket.emit('chat', () => {
    message: message.value,
    handle: handle.value,
    theTime: theTime(),
  });
  message.value = '';
});

message.addEventListener('keyup', () => {

  //if enter is pressed, send message
  if(event.keyCode === 13){
    event.preventDefault();
    btn.click();
  }

  //push is typing message
  socket.emit('typing', {
    message: message.value,
    handle: handle.value,
    timestamp: timestamp()
  })
});

// Receive EVENTS - Listen for EVENTS

//Add on to chat window
socket.on('chat', (data) => {
  feedback.innerHTML = "";
  output.innerHTML += '<p><strong>' + data.handle + '('+data.theTime+'):</strong> '+data.message+'</p>';
});


//update is typing status
socket.on('typing', (data) => {
  if(data.message == ""){
    startTime = '';
    feedback.innerHTML = "";
  }else{
    feedback.innerHTML = '<p><em>'+data.handle+' is typing a message...</em></p>';
  }

  console.log(data);
});
