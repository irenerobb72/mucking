'use strict'

process.env['DB_FILE'] = __dirname + '/db.json'

const expect = require('chai').expect
const storage = require('../lib/storage')
const overWriteDb = require('./helper').overwriteDb
const userFunctions = require('../lib/users')

describe('User Creation Functions', () => {
  beforeEach(() => {overWriteDb('empty') })
  describe('loads new username to database', () => {
    it('loads database with one entry', () => {
      userFunctions.createUser('aaron')
      expect(storage.load().users.length).to.equal(1)
    })
  })
  describe('User already exists', () => {
    it('does not add second user', () => {
      userFunctions.createUser('aaron')
      userFunctions.createUser('aaron')
      userFunctions.createUser('aaron')
      expect(storage.load().users.length).to.equal(1)
    })
  })
})
describe('User search functions', () => {
  beforeEach(() => {overWriteDb('one-user') })
  describe('Finds user by username', () => {
    it('It returns correct user', () => {
      expect(userFunctions.findUser('aaron', storage.load().users).username).to.equal('aaron')
    })
  })
  describe('Returns no matches', () => {
    it('Returns no user if it does not exist', () => {
      expect(userFunctions.findUser('bubba', storage.load().users)).to.equal('No matches')
    })
  })
})
