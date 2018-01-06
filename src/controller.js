var utils = require('./utils');

exports.createController = function (namespace, parentController, validatorNamespace, testMode) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    fs.readFile(path.join(__dirname, '../templates/controller.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Calculate the optional dependencies for the controller
        var dependencies = getDependencies(validatorNamespace);

        //Fill in the template to create a controller
        var controller = template({
            parentController: getParentControllerNamespace(parentController),
            controllerNamespace: getFullNamespace(namespace),
            dependencies: dependencies.namespaces,
            dependenciesVariables: dependencies.vars
        });

        //Save the controller
        if (!testMode) {

        } else {
            console.log(controller);
        }
    });
};

function getDependencies(validatorNamespace) {
    var dcd = utils.getConfig('defaultControllerDependencies');

    var namespaces = '', vars = '';
    for (let i = 0; i < dcd.length; i++) {
        namespaces += ', \'' + dcd[i].uri + '\'';
        vars += ', ' + dcd[i].name;
    }

    return {
        namespaces: namespaces,
        vars: vars
    }
}

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

function getFullNamespace(namespace) {
    return utils.calculateNamespace(namespace);;
}