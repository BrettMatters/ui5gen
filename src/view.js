var utils = require('./utils');

exports.createView = function (namespace, controllerName) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    function isMVCIncluded(element, index, array) {
        return element.prefix === 'mvc';
    }

    //Check if config include the MVC library which is required
    var additionalXmlNamespaces = utils.getConfig('additionalXmlNamespaces');
    if (!additionalXmlNamespaces.some(isMVCIncluded)) {
        additionalXmlNamespaces.push({
            'prefix': 'mvc',
            'uri': 'sap.ui.core.mvc'
        })
    }

    //Get all the template input fields
    var viewConfig = {
        controllerName: controllerName || utils.calculateNamespace(namespace),
        defaultXmlNamespace: utils.getConfig('defaultXmlNamespace') || 'sap.m',
        xmlNamespaces: additionalXmlNamespaces
    }

    fs.readFile(path.join(__dirname, '../templates/view.xml'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Fill in the template to create a controller
        var view = template(viewConfig);

        //Save the view       
        console.log(view);
    });

    //Return the config for any processes that need it
    return viewConfig;
};
