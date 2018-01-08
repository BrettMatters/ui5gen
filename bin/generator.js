#! /usr/bin/env node
var commander = require('commander');

commander
    .command('controller <namespace> [parentController]')
    .alias('c')
    .description('Creates a controller, (optional) validator and test shell(s)')
    .option('-v, --validator', 'Create and link a validator')
    .option('--no-tests', 'No jasmine test spec')
    .action(function (namespace, parentController, options) {
        var validatorConfig = {};
        if (options.validator) {
            validatorConfig = createValidator(namespace, options.tests);
        }

        createController(namespace, parentController, validatorConfig.validatorNamespace, options.tests);
    });

commander
    .command('view <namespace> [controllerNamespace]')
    .alias('v')
    .description('Creates a view')
    .action(function (namespace, controllerNamespace, options) {
        createView(namespace, controllerNamespace);
    });

commander
    .command('module <namespace> [parentController]')
    .alias('m')
    .description('Creates a view, controller, validator and test shells for a new UI5 module')
    .action(function (namespace, parentController, options) {
        var valConf = createValidator(namespace);
        createController(namespace, parentController, valConf.validatorNamespace);
        createView(namespace);
    });

commander
    .command('type <namespace>')
    .alias('t')
    .description('Creates a type, default to a SimpleType but can be overridden with options')
    .option('-b, --boolean', 'Boolean')
    .option('-c, --currency', 'Currency')
    .option('-d, --date', 'Date')
    .option('-f, --float', 'Float')
    .option('-i, --integer', 'Integer')
    .option('-s, --string', 'String')
    .option('-t, --time', 'Time')
    .action(function (namespace, options) {
        var type = require('../src/type.js');
        return type.createType(namespace, options);
    });

commander.parse(process.argv);


// Re-usable functions to run processing
function createView(namespace, controllerNamespace) {
    var view = require('../src/view.js');
    return view.createView(namespace, controllerNamespace);
}

function createController(namespace, parentController, validatorNamespace, tests) {
    var controller = require('../src/controller.js');
    var controllerConfig = controller.createController(namespace, parentController, validatorNamespace);

    //Create a test suite unless set not to via --no-tests
    if (tests) {
        var controllerTest = require('../src/controllerTest.js');
        controllerTest.createControllerTest(controllerConfig.controllerNamespace);
    }

    return controllerConfig;
}

function createValidator(namespace, tests) {
    var validatorConfig = {};

    var validator = require('../src/validator.js');
    validatorConfig = validator.createValidator(namespace);

    //Create a test suite unless set not to via --no-tests
    if (tests) {
        var validatorTest = require('../src/validatorTest.js');
        validatorTest.createValidatorTest(validatorConfig.validatorNamespace);
    }

    return validatorConfig;
}
