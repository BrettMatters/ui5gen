var path = require('path');
var fs = require('fs');
var nconf = require('nconf');
var stripJsonComments = require('strip-json-comments');

//Setup nconf
nconf.argv().env().file({
    file: findConfigFile(), format: {
        //Pass to another module to strip the comments from the json file
        parse: function (cjson) {
            return JSON.parse(stripJsonComments(cjson));
        }
    }
});

exports.getConfig = function (item) {
    return nconf.get(item);
}

/**
 * Bit of a crappy process to try and find the '.ui5gen.json' configuration in the file structure
 * from where ui5gen was called from. As this module can (and should) be installed globally
 * its hard to figure out where the root of the project should be.
 * 
 * This starts are the current location where the script is invoked and climbs the file tree
 * looking for either the '.ui5gen.json' file or a 'package.json' file which suggests we have hit
 * the top of the package tree. If it has to go higher than ten directories it gives up so it doesnt
 * get stuck in an infinite loop.
 * 
 * Im not sure this approach will work if this module is re-used by another re-usable module that is
 * installed locally to a project.
 */
function findConfigFile() {
    var up = '';
    var found = false;
    var foundPath;
    var failsafe = 10;
    //Search up the file tree to find the config file
    while (found === false || failsafe === 0) {
        try {
            //Start at current working directory and head up
            var file = fs.readFileSync(path.join(process.cwd() + up + '/.ui5gen.json'), 'utf8');

            //If it hasnt thrown an exception we have found the file
            found = true;
            foundPath = path.join(process.cwd() + up + '/.ui5gen.json');

        } catch (e) {
            //Test if we have hit the package.json file and exit if we have
            try {
                var file = fs.readFileSync(path.join(process.cwd() + up + '/package.json'), 'utf8');
                console.log('Cant find .ui5gen.json file. Reached top of package via finding package.json. Defaults we be used.');
                found = true;
            } catch (e) {
                //Otherwise head up a directory the next time
                up += '/..'
            }
        }

        //Fail after a while
        failsafe--;
    }

    //If we have failed to find the location, send something back otherwise the nconf will error
    return foundPath || '.ui5gen.json';
}