var utils = require('./utils');

exports.createControllerTest = function (namespace, controllerNamespace) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    fs.readFile(path.join(__dirname, '../templates/controller.spec.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Get all the template input fields
        var controllerTestConfig = {
            namespace: controllerNamespace
        }

        //Fill in the template to create a controller
        var controllerTest = template(controllerTestConfig);

        //Save the controllerTest        
        utils.writeFile(namespace + '.spec.js', controllerTest);

        //Return the config for any processes that need it
        return controllerTestConfig;
    });
}