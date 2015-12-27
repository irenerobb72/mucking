'use strict'
const socket = io.connect()

let localUser

socket.on('connect', function () {
  if (localUser) socket.emit('newuser', localUser)
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
    localUser = $('#user-login input').val()
    socket.emit('newuser', $('#user-login input').val())
    hideLogin()
  } else {
    $('#user-login input').css('border-color', 'red')
    $('#user-login').append('<p class="error">Please add a username scrub</p>')
  }
})


const hideLogin = () => {
  $('#pop-up').hide()
  $('.modal').hide()
}
