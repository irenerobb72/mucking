'use strict'
const socket = io.connect()

let localUser
let chat = document.getElementById('chat-box');

socket.once('connect', function () {
  $('#pop-up').show()
  if (localUser) socket.emit('newuser', localUser)

  socket.on('message', function (data) {
    $('#chat-box').append('<p>' + '<span>' + data[0] +
    '</span>: ' + data[1] + '</p>')
    chat.scrollTop = chat.scrollHeight;
  })
  socket.on('updateUsers', (data) => {
    $('#users').text('')
    userList(data)
  })
  socket.on('command', (data) => {
    data.forEach((item) => {
      $('#chat-box').append('<p class="command-response">' + item + '</p>')
    })
    chat.scrollTop = chat.scrollHeight;
  })
  socket.on('doWhisper', (data) => {
    $('#chat-box').append('<p class="whisper">'+ '<span> Whisper to ' +
    data[0] + '</span>: ' + data[1] + '</p>')
    chat.scrollTop = chat.scrollHeight;
    socket.emit('whisperUser', [data[0], data[1]])
  })
  socket.on('whisper', (data) => {
    $('#chat-box').append('<p class="whisper">' +
     '<span>' + data[0] + '</span>: ' + data[1] + '</p>')
     chat.scrollTop = chat.scrollHeight;
  })
  socket.on('err', (data) => {
    $('#chat-box').append('<p class="error">' +
    '<span>Server</span>: ' + data + '</p>')
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
  return input.replace('/', '').split(' ')
}

const userList = (users) => {
  users.forEach((user) => {
    const newest = users.indexOf(user) === users.length - 1
    user = '<p>' + user.username + '</p>'
    newest ? $(user).hide().appendTo('#users').fadeIn(1000) : $(user).appendTo('#users')
  })
}

const userLogin = (e) => {
  e.preventDefault()
  const username = $('#user-login input').val()
  $('#user-login input').css('border-color', 'transparent')
  $('#user-login .error').remove()
  if (username.length && username.indexOf(' ') === -1) {
    localUser = username
    socket.emit('newuser', username)
    hideLogin()
  } else {
    $('#user-login input').css('border-color', 'red')
    $('#user-login').append('<p class="error">Fix it scrub</p>')
  }
}

const hideLogin = () => {
  $('.pop-modal').hide()
  $('.cust-modal').hide()
}

//Register Events

$('#chat-input').on('submit', chatInput)
$('#user-login').on('submit', userLogin)
