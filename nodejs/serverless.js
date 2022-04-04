'use strict'

const build = require('./index')

const app = build()

module.exports = async (req, res) => {
  await app.ready()
  app.server.emit('request', req, res)
}
