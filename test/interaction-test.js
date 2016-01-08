'use strict'

process.env['DB_FILE'] = __dirname + '/db.json'

const expect = require('chai').expect
const interactions = require('../lib/interactions')
const overWriteDb = require('./helper').overwriteDb
const userFunctions = require('../lib/users')

describe('Chat functions', () => {
  beforeEach(() => {overWriteDb('empty') })
  describe('', () => {
    xit('loads database with one entry', () => {

    })
  })
  describe('User already exists', () => {
    xit('does not add second user', () => {

    })
  })
})
