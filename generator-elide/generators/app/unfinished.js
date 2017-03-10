var Generator = require('yeoman-generator');

// module.exports = class extends Generator {};

module.exports = class extends Generator {
	// The name `constructor` is important here
	constructor(args, opts) {
    	// Calling the super constructor is important so our generator is correctly set up
   		super(args, opts);
   	}

  //  	prompting() {
  //   return this.prompt([{
  //     type    : 'input',
  //     name    : 'name',
  //     message : 'Your project name',
  //     default : this.appname // Default to current folder name
  //   }, {
  //     type    : 'confirm',
  //     name    : 'cool',
  //     message : 'Would you like to enable the Cool feature?'
  //   }]).then((answers) => {
  //     this.log('app name', answers.name);
  //     this.log('cool feature', answers.cool);
  //   });
  // } 

	model() {
		this.prompt([{
			type    : 'input',
			name    : 'name',
			message : 'Name?'
			},{
			type    : 'list',
			choices: [
				"String",
				"Int",
				new inquirer.Separator(),
				"Short",
				"Float",
				"Double",
				"Long",
				"Long long",
				"Boolean",
				"Char"
			   ],
			name    : 'type',
			message : 'Want to create a model?'
		}]).then((model) => {
			this.log(model.name);
			this.log(model.type);
		});
	}

   	prompting() {
		return this.prompt([{
			type    : 'confirm',
			name    : 'model',
			message : 'Want to create a model?'
		}]).then((answer) => {
			if(answer.model == true) {
				_model();
			}
		});
	}

	

	method1() {
 		this.log('method 1 just ran');
	}
};