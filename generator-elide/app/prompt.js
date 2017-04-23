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
            generator.generate_example_project(yo, "com.yahoo.elide.example");
            console.log("Example project created under elide/elide-example");
        }
        else if (answers.command === 'Create a new project') {
            // Ask questions when creating a new project
            create_new_project(yo);
        }
        else if (answers.command === 'Info & Contact') {
            misc.show_info();
        }
    });
}

// Create new project prompt
function create_new_project(yo) {
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
                model.model_prompt(yo, answers.project_name, answers.package_name);
            }
            else {
                generator.generate_new_project(yo, answers.project_name, answers.package_name);
            }
      });
}

module.exports = {
    prompting: prompting,
    create_new_project: create_new_project
}
