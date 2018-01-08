var utils = require('./utils');

const types = {
    boolean: 'sap.ui.model.type.Boolean',
    currency: 'sap.ui.model.type.Currency',
    date: 'sap.ui.model.type.Date',
    float: 'sap.ui.model.type.Float',
    integer: 'sap.ui.model.type.Integer',
    string: 'sap.ui.model.type.String',
    time: 'sap.ui.model.type.Time'
}

exports.createType = function (namespace, options) {
    var fs = require('fs');
    var path = require('path');
    var handlebars = require('handlebars');

    var type;
    //Loop over the possible types
    for (let t in types) {
        //and check if the options flag is true
        if (options[t]) {
            type = types[t];
        }
    }

    //Get all the template input fields
    var typeConfig = {
        parentType: type || 'sap.ui.model.SimpleType',
        typeNamespace: utils.calculateNamespace(namespace)
    }

    fs.readFile(path.join(__dirname, '../templates/type.js'), 'utf8', function (err, file) {
        //Pull the file into handlebars
        var template = handlebars.compile(file);

        //Fill in the template to create a controller
        var type = template(typeConfig);

        //Save the type       
        console.log(type);
    });

    //Return the config for any processes that need it
    return typeConfig;
};
