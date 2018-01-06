sap.ui.define([
    '{{parentController}}'{{#dependencies}}, '{{uri}}'{{/dependencies}}
  ], function (Controller{{#dependencies}}, {{name}}{{/dependencies}}) {
    'use strict'
    return Controller.extend('{{controllerNamespace}}', {
    })
  })
  