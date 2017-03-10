var Generator = require('yeoman-generator');

// module.exports = class extends Generator {};

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
    	// Calling the super constructor is important so our generator is correctly set up
   		super(args, opts);
   	}

	prompting() {
		return this.prompt([{
			type    : 'input',
			name    : 'name',
			message : 'Your project name',
			default : this.appname // Default to current folder name
		}, {
			type    : 'confirm',
			name    : 'cool',
			message : 'Would you like to enable the Cool feature?'
		}, {
			type	: 'list',
			name	: 'database',
			message	: 'Choose a database system',
			choices	: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite']
		}]).then((answers) => {
			// writing(answers);
			this.fs.copyTpl(
				this.templatePath('index.html'),
				this.destinationPath('public/test.cpp'), {
					project_name: answers.name,
					cool_feature: answers.cool,
					database	: answers.database
				}
			);
		});
	}

	// writing(answers) {
	// 	this.fs.copyTpl(
	// 		this.templatePath('index.html'),
	// 		this.destinationPath('public/index.html'), {
	// 			title: answers.name
	// 		}
	// 	);
	// }
};
