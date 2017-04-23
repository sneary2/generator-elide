var generator = require('./generator')
var model = require('./model')
var misc = require('./misc.js');

// Main prompt when running 'yo elide'
function prompting(yo) {
    yo.prompt([{
        type	: 'list',
        name	: 'command',
        message	: 'Choose an option below',
        choices	: ['Try an example', 'Create a new project', 'Info & Contact']
    }]).then((answers) => {
        if (answers.command === 'Try an example') {
            // Generate an example
            generator.generateExampleProject(yo, "com.yahoo.elide.example");
            console.log("Example project created under elide/elide-example");
        }
        else if (answers.command === 'Create a new project') {
            // Ask questions when creating a new project
            createNewProject(yo);
        }
        else if (answers.command === 'Info & Contact') {
            misc.showInfo();
        }
    });
}

// Create new project prompt
function createNewProject(yo) {
    yo.prompt([{
        // Project name
        type    : 'input',
        name    : 'project_name',
        message : 'Your project name',
        default : yo.appname // Default to current folder name
    }, {
        // Package name
        type    : 'input',
        name    : 'package_name',
        message : 'Your package name',
    }, {
        // Author
        type	: 'input',
        name	: 'author',
        message	: 'Author'
    }, {
        // Version
        type	: 'input',
        name	: 'version',
        message	: 'Version'
    }, {
        // License
        type	: 'input',
        name	: 'license',
        message	: 'License'
    }, {
        type    : 'confirm',
        name    : 'model',
        message : 'Would you like to add models?'
    }]).then((answers) => {
            if (answers.model) {
                model.modelPrompt(yo, answers.project_name, answers.package_name);
            }
            else {
                generator.generateNewProject(yo, answers.project_name, answers.package_name,
                    {
                        artifactId  : answers.project_name,
                        groupId     : answers.package_name,
                        name        : answers.project_name,
                        version     : answers.version,
                        description : ""
                    });
            }
      });
}

module.exports = {
    prompting: prompting,
    createNewProject: createNewProject
}
