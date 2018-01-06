var utils = require('./utils');

exports.createValidatorTest = function (validatorNamespace, testMode) {
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
        if (!testMode) {

        } else {
            console.log(validatorTest);
        }

        //Return the config for any processes that need it
        return validatorTestConfig;
    });
}