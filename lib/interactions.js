'use strict'

const R = require('ramda')
const users = require('./users')
const storage = require('./storage')

const commands = {
  help: {
    desc: '| Returns list of all commands',
    use: (socket, args) => {
      const helpList = []
      R.keys(commands).forEach((command) => {
        helpList.push('/' + command + ' ' + commands[command].desc)
      })
      socket.emit('command', helpList)
    }
  },
  w: {
    desc: '(user) (message content) | Sends a user a message privately',
    use: (socket, args) => {
      const target = args[0]
      args.shift()
      const message = args.join(' ')
      socket.emit('doWhisper', [target, message])
    }
  },
  who: {
    desc: '(user) | Returns user information',
    use: (socket, args) => {
      const user = users.findUser(args[0], storage.load().users)
      user != 'No matches' ?
      socket.emit('command', ['Username: ' + user.username + ' Role: ' + user.role]) :
      socket.emit('err', user)

    }
  }
}

module.exports = {
  commands: commands
}
