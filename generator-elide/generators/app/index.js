var Generator = require('yeoman-generator');
var prompt = require('./prompt');
var model = require('./model');
var generator = require('./generator');

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

        this.option('example');		// Option flag to generate an example
		this.option('create');		// Option flag to create a new project
		this.option('info');		// Option flag to show Elide boot info
	}
	
	// Show info
	_show_info() {
		console.log("Elide Boot is a command line interface (CLI) for Yahoo! Elide libary");
		console.log("Author: Deez Nuts");
		console.log("Version: 1.0.0");
		console.log("Contact: lame_email@suspicious-server.com");
	}

	main() {
		if (this.options.example) {
			console.log("Generate an example");
			generator.generate_example_project(this, "com.yahoo.elide.example");
			console.log("Example project created under elide/elide-example");
		}
		else if (this.options.create) {
			console.log("Create a new project");
			generator.create_new_project(this);
		}
		else if (this.options.model) {
			console.log("Add models to project");
			model.model_prompt(this);
		}
		else if (this.options.info){
			this._show_info()
		}
		else {
			prompt.prompting(this);
		}
	}
};
