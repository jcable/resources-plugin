/*
 * Copyright 2018 Julian Cable <julian.cable@yahoo.com>
 *
 */

const debug = require('debug')('resources')

module.exports = function (app) {
  const error = app.error || (msg => {console.error(msg)})
  const apiRoutePrefix = '/signalk/v1/api/resources'
  let pluginStarted = false

  var plugin = {}

  plugin.start = function (props) {
    debug(`Start plugin resources`)
    pluginStarted === false && registerRoutes()
    pluginStarted = true
  }

  plugin.stop = function () {
    debug(`Stop plugin resources`)
  }

  plugin.id = 'resources'
  plugin.name = 'Signal K Notes'
  plugin.description =
    "Plugin that provides a source of note resources"

  plugin.schema = {
    type: 'object',
    properties: {
    }
  }

  function registerRoutes() {

    app.get(apiRoutePrefix + "/resources", (req, res) => {
      res.json({})
    })
  }

  return plugin

}
