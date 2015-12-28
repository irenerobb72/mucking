'use strict'

const koa = require('koa')
const app = koa()
const serve = require('koa-static')
const server = require('http').createServer(app.callback()).listen(3000)
const io = require('socket.io')(server)
const users = require('./lib/users')
const R = require('ramda')

app.use(serve(__dirname + '/client'))

const sockets = []
const latest = []
let currentUsers = []


io.on('connection', (socket) => {
  sockets.push(socket)
  latestMessages(socket)

  socket.on('message', (data) => {
    if (latest.length > 15) latest.shift()
    latest.push([socket.user.username, data])
    broadcast('message', [socket.user.username, data])
  })

  socket.on('newuser', (data) => {
    socket.user = users.createUser(data)
    broadcast('message', ['Channel', socket.user.username + ' has joined the channel'])
    currentUsers.push(socket.user)
    updateUserList(currentUsers)
  })

  socket.on('disconnect', (data) => {
    if(!socket.user){
      return
    }
    currentUsers = R.filter((user) => user.username != socket.user.username, currentUsers)
    broadcast('message', socket.user.username + ' has left the channel')
    updateUserList(currentUsers)
  })
})

//Client utility
const broadcast = (event, data) => {
  sockets.forEach((socket) => {
    socket.emit(event, data)
  })
}

const latestMessages = (socket) => {
  latest.forEach((message) => {
    socket.emit('message', message)
  })
}

const updateUserList = (data) => {
  broadcast('updateUsers', data)
}



console.log('listening on port 3000')
