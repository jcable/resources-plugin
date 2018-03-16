/*
 * Copyright 2018 Julian Cable <julian.cable@yahoo.com>
 *
 */

const debug = require('debug')('resources')
const fetch = require('node-fetch')

module.exports = function (app) {
  const error = app.error || (msg => {console.error(msg)})
  const apiRoutePrefix = '/signalk/v1/api'
  const keys = ['charts','notes','regions','routes','waypoints']
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
  plugin.name = 'Signal K Resources'
  plugin.description =
    "Plugin that provides a source of resources"

  plugin.schema = {
    type: 'object',
    properties: {
    }
  }

  function registerRoutes() {

    app.get(apiRoutePrefix + "/resources", (req, res) => {
      let base = req.protocol+"://"+req.headers.host
      console.log(req.protocol)
      let promises = [];
      for(var i=0; i<keys.length; i++) {
        const key = keys[i]
        promises.push(new Promise(function(resolve, reject) {
          const url = base+apiRoutePrefix + "/resources/" + key
          fetch(url)
          .then(res => res.json())
          .then(json => {
            resolve({key:key,val:json})
          })
          .catch(err => {
            resolve(null)
          })
          })
        )
      }
      Promise.all(promises).then(o =>{
        var r = {}
        for(var i = 0; i<o.length; i++) {
          if(o[i] != null) {
            var p = o[i]
            r[p.key] = p.val  
          }
        }
        res.json(r)
      })
    })
  }

  return plugin

}