'use strict'

const fastify = require('fastify')

const build = () => {
  const app = fastify({
    logger: true
  })

  app.get('/', async (req, res) => {
    const { name = 'World' } = req.query
    req.log.info({ name }, 'hello world')
    return `Hello ${name} via fastify`
  })

  return app
}

module.exports = build
