var Generator = require('yeoman-generator');
var prompt = require('./prompt.js')

var new_model_attributes = [];

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

        this.option('example');		// Option flag to generate an example
		this.option('create');		// Option flag to create a new project
		this.option('info');		// Option flag to show Elide boot info
	}

	_generate_new_project(project_name, package_name) {
		var file = package_name.split('.').join('/');
		// Create the main.java file
		this.fs.copyTpl(
			this.templatePath("blog-example/Main.java"),
			this.destinationPath(project_name + "/src/main/java/" + file + "/Main.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/ElideResourceConfig.java"),
			this.destinationPath(project_name + "/src/main/java/" + file + "/ElideResourceConfig.java"),
			{}
		);

		// Don't know what this is
		this.fs.copyTpl(
			this.templatePath("blog-example/hibernate.cfg.xml"),
			this.destinationPath(project_name + "/src/resources/hibernate.cfg.xml"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/log4j2.xml"),
			this.destinationPath(project_name + "/src/resources/log4j2.xml"),
			{}
		);

		this.fs.copyTpl(
			this.templatePath("blog-example/load_blog.sh"),
			this.destinationPath(project_name + "/src/scripts/load_blog.sh"),
			{}
		);

		// create the pom file
		// TODO: Should create a generic pom file
		// e.g. to download elide and its dependencies

		// this.fs.copyTpl(
		// 	this.templatePath("template-pom.xml"),
		// 	this.destinationPath("pom.xml"),
		// 	{}
		// );
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
			// this.log("Hello");
			this.log(model.name);
			this.log(model.type);

			// this._dezznuts();
			// var my_func = this._model;
			this.prompt([{
				type	: 'confirm',
				name	: 'continue',
				message : 'Add attribute?'
			}]).then((response) => {

				if (response.continue === true) {
					console.log("yes");
					this._model(new_model_attributes);
				}
				else {
					console.log("Shane is gay");
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

	// Show info
	_show_info() {
		console.log("Elide Boot is a command line interface (CLI) for Yahoo! Elide libary");
		console.log("Author: Deez Nuts");
		console.log("Version: 1.0.0");
		console.log("Contact: lame_email@suspicious-server.com");
	}

	main() {
		prompt.prompting(this);

		// if (this.options.example) {
		// 	console.log("Generate an example");
		// 	this._generate_example_project("com.yahoo.elide.example");
		// 	console.log("Example project created under elide/elide-example");
		// }
		// else if (this.options.create) {
		// 	console.log("Create a new project");
		// 	this._create_new_project();
		// }
		// else if (this.options.model) {
		// 	console.log("Add models to project");
		// 	this._model(new_model_attributes);
		// }
		// else if (this.options.info){
		// 	this._show_info()
		// }
		// else {
		// 	prompt._prompting(this);
		// }
	}
};
