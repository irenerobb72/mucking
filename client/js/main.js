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

$('#user-login').on('submit', (e) => {
  e.preventDefault()
  if ($('#user-login input').val().length) {
    socket.emit('newuser', $('#user-login input').val())
    $('#pop-up').hide()
    $('.modal').hide()
  } else {
    $('#user-login input').css('border-color', 'red')
    $('#user-login').append('<p class="error" >Please add a username scrub</p>')
  }
})
