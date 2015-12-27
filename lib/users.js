'use strict'
const storage = require('./storage')
const R = require('ramda')

const createUser = (username) => {
  const data = storage.load()
  data.users.push(new User(username))
  storage.save(data)
}


const User = function(username) {
  this.username = username
  this.role = 'user'
}

module.exports = {
  createUser: createUser
}
