#! /usr/bin/env node
var commander = require('commander');

commander
    .command('controller <namespace> [parentController]')
    .alias('c')
    .description('Creates a controller')
    .option('-v, --validator', 'Create and link a validator')
    .option('--no-tests', 'No jasmine test spec')
    .option('--test', 'Test mode, no files created')
    .action(function (namespace, parentController, options) {
        var validatorConfig;
        if (options.validator) {
            var validator = require('../src/validator.js');
            validatorConfig = validator.createValidator(namespace, options.test);

            //Create a test suite unless set not to via --no-tests
            if (options.tests) {
                var validatorTest = require('../src/validatorTest.js');
                validatorTest.createValidatorTest(validatorConfig.validatorNamespace, options.test);
            }
        }

        var controller = require('../src/controller.js');
        var controllerConfig = controller.createController(namespace, parentController, validatorConfig.validatorNamespace, options.test);

        //Create a test suite unless set not to via --no-tests
        if (options.tests) {
            var controllerTest = require('../src/controllerTest.js');
            controllerTest.createControllerTest(controllerConfig.controllerNamespace, options.test);
        }
    });

commander
    .command('view [namespace]')
    .description('Creates a view')
    .action(function (namespace, options) {
        // var mode = options.setup_mode || 'normal';
        // env = env || 'all';
        // console.log('cccc', env, mode);
    });

commander.parse(process.argv);
