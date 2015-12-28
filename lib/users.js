'use strict'
const storage = require('./storage')
const R = require('ramda')

const createUser = (username) => {
  const data = storage.load()
  var currentUser
  if (!findUser(username, data.users)){
    currentUser = new User(username)
    data.users.push(currentUser)
    storage.save(data)
  } else {
    currentUser = findUser(username, data.users)
  }
  return currentUser
}


const User = function(username) {
  this.username = username
  this.role = 'user'
}

const findUser = (username, users) => {
  return R.filter((user) => user.username === username, users)[0]
}

module.exports = {
  createUser: createUser
}
