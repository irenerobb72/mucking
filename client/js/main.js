'use strict'
const socket = io.connect()

let localUser
let chat = document.getElementById('chat-box');

socket.on('connect', function () {
  $('#pop-up').show()
  if (localUser) socket.emit('newuser', localUser)

  socket.on('message', function (data) {
    $('#chat-box').append('<p>'+ '<span>' + data[0] + '</span>: ' + data[1] + '</p>')
    chat.scrollTop = chat.scrollHeight;
  })
  socket.on('updateUsers', (data) => {
    $('#users').text('')
    data.forEach((user) => {
      $('#users').append('<p>' + user.username + '</p>')
    })
  })
  socket.on('command', (data) => {
    data.forEach((item) => {
      $('#chat-box').append('<p>' + item + '</p>')
    })
  })
  socket.on('doWhisper', (data) => {
    socket.emit('whisperUser', [data[0], data[1]])
  })
  socket.on('whisper', (data) => {
    $('#chat-box').append('<p class="whisper">'+ '<span>' + data[0] + '</span>: ' + data[1] + '</p>')
  })
  socket.on('disconnect', (data) => {
    localUser = undefined
    $('.cust-modal').show()
  })
})

//Event Functions

const chatInput = (e) => {
  let input = $('#chat-input input').val()
  e.preventDefault()
  if(input.length && !parseCommand(input)) {
    socket.emit('message', input)
  }
  $('#chat-input input').val('')
}

const parseCommand = (input) => {
  if (input[0] === '/') {
    input = removeSlash(input)
    var command = input[0]
    input.shift()
    var args = input
    socket.emit('command', [command, args])
    return true
  } else {
    return false
  }
}

const removeSlash = (input) => {
  input = input.split(' ')
  input[0] = input[0].split('')
  input[0].shift()
  input[0] = input[0].join('')
  return input
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

const hideLogin = () => {
  $('#pop-up').hide()
  $('.cust-modal').hide()
}

//Register Events

$('#chat-input').on('submit', chatInput)
$('#user-login').on('submit', userLogin)
