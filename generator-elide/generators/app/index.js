var Generator = require('yeoman-generator');

function model() {
	this.name = null;
	this.type = null;
}

var new_model_attributes = [];

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

        this.option('example');		// Option flag to generate an example
		this.option('create');		// Option flag to create a new project
		this.option('info');		// Option flag to show Elide boot info
	}

	// This function get called when the user doesn't specify any options
	_prompting() {
		return this.prompt([{
			type	: 'list',
			name	: 'command',
			message	: 'Choose an option below',
			choices	: ['Try an example', 'Create a new project', 'Info & Contact']
		}]).then((answers) => {
			if (answers.command === 'Try an example') {
				// Generate an example
				this._generate_project("com.yahoo.elide.example");
			}
			else if (answers.command === 'Create a new project'){
				// Ask questions when creating a new project
				this._create_new_project();
				this._model(new_model_attributes);
			}
			else {
				this._show_info();
			}
		});
	}

	// Generate an example
	_generate_project(project_name) {

		// var project = {
		// 	name: "com.yahoo.elide.example"
		// }

		var file = project_name.split('.').join('/');
		// Create the main.java file
		this.fs.copyTpl(
			this.templatePath("blog-example/Main.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/Main.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/ElideResourceConfig.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/ElideResourceConfig.java"),
			{}
		);

		// Init the models folder blog-example
		this.fs.copyTpl(
			this.templatePath("blog-example/Comment.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Comment.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/Post.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Post.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/Role.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Role.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/User.java"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/User.java"),
			{}
		);

		// Don't know what this is
		this.fs.copyTpl(
			this.templatePath("blog-example/hibernate.cfg.xml"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/resources/hibernate.cfg.xml"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/log4j2.xml"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/resources/log4j2.xml"),
			{}
		);

		this.fs.copyTpl(
			this.templatePath("blog-example/load_blog.sh"),
			this.destinationPath("elide/elide-example/elide-blog-example/src/scripts/load_blog.sh"),
			{}
		);

		// create the pom file
		this.fs.copyTpl(
			this.templatePath("template-pom.xml"),
			this.destinationPath("pom.xml"),
			{}
		);
	}

	_model(new_model_attributes) {
		return this.prompt([{
			type	: 'input',
			name	: 'name',
			message : 'Model Name?'
		},{
			name	: 'type',
			message : 'Want to create a model perhaps?',
			type	: 'list',
			choices: [
				"String",
				"Int",
				"Short",
				"Float",
				"Double",
				"Long",
				"Long long",
				"Boolean",
				"Char"
			   ]
		}]).then((model) => {
			// new_model_attributes.push({model.name , model.type})
			// this.log("Hello");
			this.log(model.name);
			this.log(model.type);

			// this._dezznuts();
			// var my_func = this._model;
			this.prompt([{
				type	: 'confirm',
				name	: 'continue',
				message : 'Add another attribute?'
			}]).then((response) => {

				if (response.continue === true) {
					console.log("yes");
					this._model(new_model_attributes);
				}
				else {
					console.log("Phillip is gay");
				}
			});
		});
	}

	_create_model() {
		this.fs.copyTpl(
			this.templatePath("model.java"),
			this.destinationPath("model.java"),
			{
				name: "Book",
				elements: [
					{name: "pages", 	type: "int"},
					{name: "author", 	type: "String"},
					{name: "hardcover", type: "boolean"}
				]
			}
		);
	}

	// Create new project
	_create_new_project() {
		return this.prompt([{
			// Project name
			type    : 'input',
			name    : 'project_name',
			message : 'Your project name',
			default : this.appname // Default to current folder name
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
			  this._generate_project(answers.package_name + "." + answers.project_name);
			});
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
			this._generate_project();
		}
		else if (this.options.create) {
			console.log("Create a new project");
			this._create_new_project();
			this._model(new_model_attributes);
		}
		else if (this.options.info){
			this._show_info()
		}
		else {
			this._prompting();
		}
	}
};
