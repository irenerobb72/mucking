const koa = require('koa')
const app = koa()
const serve = require('koa-static')
const server = require('http').createServer(app.callback()).listen(3000)
const io = require('socket.io')(server)

app.use(serve(__dirname + '/client'))

const sockets = []
const latest = []

io.on('connection', (socket) => {
  sockets.push(socket)
  latest.forEach((message) => {
    socket.emit('message', message)
  })
  socket.on('message', (data) => {
    latest.push(data)
    if(latest.length > 15) {
      latest.shift()
    }
    broadcast('message', data)
  })
})

const broadcast = (event, data) => {
  sockets.forEach((socket) => {
    socket.emit(event, data)
  })
}

console.log('listening on port 3000')
