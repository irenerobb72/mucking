'use strict'

const fs = require('fs')

let dbFile = process.env['DB_FILE'] || __dirname + '/../db.json'

module.exports = {
  load: () => {
    return JSON.parse(fs.readFileSync(dbFile, 'utf8'))
  },
  save: (db) => {
    fs.writeFileSync(dbFile, JSON.stringify(db), 'utf8')
  }
}
