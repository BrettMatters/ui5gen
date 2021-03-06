var utils = require('./utils');

exports.createValidatorTest = function (namespace, validatorNamespace) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    fs.readFile(path.join(__dirname, '../templates/validator.spec.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Get all the template input fields
        var validatorTestConfig = {
            namespace: validatorNamespace
        }

        //Fill in the template to create a validator
        var validatorTest = template(validatorTestConfig);

        //Save the validatorTest       
        utils.writeFile(namespace + 'Validator.spec.js', validatorTest);

        //Return the config for any processes that need it
        return validatorTestConfig;
    });
}