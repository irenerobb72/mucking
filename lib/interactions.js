'use strict'

const R = require('ramda')

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
  whisper: {
    desc: '(user) (message content) | Sends a user a message privately',
    use: (socket, args) => {
      const target = args[0]
      args.shift()
      const message = args.join(' ')
      socket.emit('doWhisper', [target, message])
    }
  }
}

module.exports = {
  commands: commands
}
