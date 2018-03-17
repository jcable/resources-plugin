# resources-plugin
signalk plugin to respond to the resources/resources REST API.

This plugin aggregates the next level down available objects by fetching the content using http/https.

If a child object returns an error it is omitted from the result.

The child object list is held in a literal array - this could be moved to config and child plugins could register.
