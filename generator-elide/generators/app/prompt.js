var generator = require('./generator')
var model = require('./model')

// Main prompt when running 'yo elide'
function prompting(yo) {
    yo.prompt([{
        type	: 'list',
        name	: 'command',
        message	: 'Choose an option below',
        choices	: ['Try an example', 'Create a new project', 'Add models to an existing project', 'Info & Contact']
    }]).then((answers) => {
        if (answers.command === 'Try an example') {
            // Generate an example
            generate.generate_example_project(yo, "com.yahoo.elide.example");
            console.log("Example project created under elide/elide-example");
        }
        else if (answers.command === 'Create a new project') {
            // Ask questions when creating a new project
            create_new_project(yo);
        }
        else if (answers.command === 'Add models to an existing project') {
            model.model_prompt(yo);
        }
        else {
            // this._show_info();
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
    }]).then((answers) => {
          generator.generate_new_project(yo, answers.project_name, answers.package_name);
      });
}

module.exports = {
    prompting: prompting
}
