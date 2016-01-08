'use strict'
const storage = require('./storage')
const R = require('ramda')

const createUser = (username) => {
  const data = storage.load()
  var currentUser
  if (findUser(username, data.users) === 'No matches'){
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
  const foundUser = R.filter((user) => R.toLower(user.username) === R.toLower(username), users)[0]
  return foundUser ? foundUser : 'No matches'
}

module.exports = {
  createUser: createUser,
  findUser: findUser
}
