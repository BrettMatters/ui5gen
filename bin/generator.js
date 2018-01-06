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
        //TODO: Create validator if requested
        var validatorNamespace;

        //TODO: Create test unless set to not

        var controller = require('../src/controller.js');
        controller.createController(namespace, parentController, validatorNamespace, options.test);
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
