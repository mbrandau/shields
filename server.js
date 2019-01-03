'use strict'

const Raven = require('raven')
const serverSecrets = require('./lib/server-secrets')

Raven.config(process.env.SENTRY_DSN || serverSecrets.sentry_dsn).install()
Raven.disableConsoleAlerts()

const Server = require('./lib/server')
const config = require('./lib/server-config')

const server = (module.exports = new Server(config))

;(async () => {
  try {
    await server.start()
  } catch (e) {
    console.error(e)
    process.exit(1)
  }
})()
