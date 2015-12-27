'use strict'
const socket = io.connect()

let localUser
let chat = document.getElementById('chat-box');

socket.on('connect', function () {

  if (localUser) socket.emit('newuser', localUser)

  socket.on('message', function (data) {
    $('#chat-box').append('<p>' + data + '</p>')
    chat.scrollTop = chat.scrollHeight;
  })
  socket.on('updateUsers', (data) => {
    $('#users').text('')
    data.forEach((name) => {
      $('#users').append('<p>' + name + '</p>')
    })
  })
})

//Chat Handler

const chatInput = (e) => {
  e.preventDefault()
  if($('#chat-input input').val().length) {
    socket.emit('message', $('#chat-input input').val())
  }
  $('#chat-input input').val('')
}

const userLogin = (e) => {
  e.preventDefault()
  if ($('#user-login input').val().length) {
    localUser = $('#user-login input').val()
    socket.emit('newuser', $('#user-login input').val())
    hideLogin()
  } else {
    $('#user-login input').css('border-color', 'red')
    $('#user-login').append('<p class="error">Please add a username scrub</p>')
  }
}


$('#chat-input').on('submit', chatInput)

$('#user-login').on('submit', userLogin)


const hideLogin = () => {
  $('#pop-up').hide()
  $('.modal').hide()
}
