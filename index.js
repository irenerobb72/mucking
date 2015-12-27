const koa = require('koa')
const app = koa()
const serve = require('koa-static')
const server = require('http').createServer(app.callback()).listen(3000)
const io = require('socket.io')(server)
const users = require('./lib/users')

app.use(serve(__dirname + '/client'))

const sockets = []
const latest = []

io.on('connection', (socket) => {
  sockets.push(socket)
  latestMessages(socket)
  socket.on('message', (data) => {
    latest.length > 15 ? latest.shift().push(socket.userName + ': ' + data) : latest.push(socket.userName + ': ' + data)
    broadcast('message', socket.userName + ': ' + data)
  })

  socket.on('newuser', (data) => {
    socket.user = users.createUser(data)
    broadcast('message', socket.user.userName + ' has joined the channel')
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

console.log('listening on port 3000')
