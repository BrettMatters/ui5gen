var utils = require('./utils');

exports.createController = function (namespace, parentController, validatorNamespace, testMode) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    //Get all the template input fields
    var controllerConfig = {
        parentController: getParentControllerNamespace(parentController),
        controllerNamespace: utils.calculateNamespace(namespace),
        dependencies: utils.getConfig('defaultControllerDependencies')
    }
    //Link the validator if required
    if (validatorNamespace) {
        //Namespace need to be oonverted to a URL as this is the expected format
        controllerConfig.dependencies.push({
            uri: utils.convertNamespaceToURI(validatorNamespace),
            name: 'Validator'
        });
    }

    fs.readFile(path.join(__dirname, '../templates/controller.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Fill in the template to create a controller
        var controller = template(controllerConfig);

        //Save the controller
        if (!testMode) {

        } else {
            console.log(controller);
        }
    });

    //Return the config for any processes that need it
    return controllerConfig;
};

function getParentControllerNamespace(parentController) {
    //If no parent is specified
    if (parentController) {
        var parentControllers = utils.getConfig('parentControllers');

        //Search for a matching id and use that controllers uri
        for (let i = 0; i < parentControllers.length; i++) {
            if (parentControllers[i].id === parentController) {
                return parentControllers[i].uri;
            }
        }

        //Show error on console
        console.log('Can\'t find parent controller: ' + parentController, '. Default has been used.');
    }

    //Use the default for the project, or base SAP controller
    return utils.getConfig('defaultControllerParent') || 'sap/ui/core/mvc/Controller';
}
