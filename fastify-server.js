const build = require('./api/index')

const app = build()

// app.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
app.listen(process.env.PORT || 3000, (err, address) => {
  if (err) {
    app.log.error(err)
    process.exit(1)
  }
  app.log.info(`server listening on ${address}`)
})
