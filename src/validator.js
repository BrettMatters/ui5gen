var utils = require('./utils');

exports.createValidator = function (namespace) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    //Get all the template input fields
    var validatorConfig = {
        parentValidator: utils.getConfig('defaultValidatorParent') || 'sap.ui.base.Object',
        validatorNamespace: utils.calculateNamespace(namespace) + 'Validator',
        dependencies: utils.getConfig('defaultValidatorDependencies')
    }

    fs.readFile(path.join(__dirname, '../templates/validator.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Fill in the template to create a controller
        var validator = template(validatorConfig);

        //Save the validator       
        utils.writeFile(namespace + 'Validator.js', validator);
    });

    //Return the config for any processes that need it
    return validatorConfig;
};
