sap.ui.define([
    '{{parentValidator}}'{{#dependencies}}, '{{uri}}'{{/dependencies}}
  ], function (Validator{{#dependencies}}, {{name}}{{/dependencies}}) {
    'use strict'
    return Validator.extend('{{validatorNamespace}}', {
    })
  })
  