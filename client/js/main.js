const socket = io.connect()

socket.on('connect', function () {
  socket.on('message', function (data) {
    $('#chat-box').append('<p>' + data + '</p>')
  })
})

//Chat Handler

$('#chat-input').on('submit', (e) => {
  e.preventDefault()
  if($('#chat-input input').val().length) {
    socket.emit('message', $('#chat-input input').val())
  }
  $('#chat-input input').val('')
})
