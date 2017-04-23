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
            generator.generateExampleProject(yo, 'com.yahoo.elide.example');
            console.log('Example project created under elide/elide-example');
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
        // artifactId
        type    : 'input',
        name    : 'artifactId',
        message : 'artifactId',
    }, {
        // groupId
        type    : 'input',
        name    : 'groupId',
        message : 'groupId',
    }, {
        // Project name
        type	: 'input',
        name	: 'project_name',
        message	: 'Project name'
    }, {
        // Description
        type	: 'input',
        name	: 'description',
        message	: 'Description'
    }, {
        // Version
        type	: 'input',
        name	: 'version',
        message	: 'Version'
    }, {
        // Author
        type	: 'input',
        name	: 'author',
        message	: 'Author'
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
                model.modelPrompt(yo, answers.artifactId, answers.groupId);
            }
            else {
                generator.generateNewProject(yo, answers.artifactId, answers.groupId,
                    {
                        artifactId  : answers.artifactId,
                        groupId     : answers.groupId,
                        name        : answers.project_name,
                        version     : answers.version,
                        description : answers.description
                    });
            }
      });
}

module.exports = {
    prompting: prompting,
    createNewProject: createNewProject
}
