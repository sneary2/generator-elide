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

		// This method adds support for a `--example` flag
        this.option('example');
        // And you can then access it later; e.g.
        // this.options.example? this._create_main(): this._prompting();
		// this._create_main()
	}

	_prompting() {
		return this.prompt([{
			type	: 'list',
			name	: 'command',
			message	: 'Choose an option below',
			choices	: ['Try an example', 'Create new project', 'Other Stuff', 'Other Stuff']
		}]).then((answers) => {
			if (answers.command === 'Try an example') {
				// Generate an example
				this._create_main("com.yahoo.elide.example");
			}
			else {
				console.log("Yo World");
			}
			// writing(answers);
			// this.fs.copyTpl(
			// 	this.templatePath('index.html'),
				// this.destinationPath('public/test.cpp'), {
				// 	project_name: answers.name,
				// 	cool_feature: answers.cool,
				// 	database	: answers.database
				// }
			// );
		});
	}

	_create_main(project_name) {

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

	_dezznuts() {
		console.log("Dezz Nuts");
	}

	_continue_generating_models(callback) {
		var result;
		this.prompt([{
			type	: 'confirm',
			name	: 'contine',
			message : 'Add another attribute?'
		}]).then((response) => {
			// new_model.name = model.name;
			// new_model.type = model.type
			result = response.contine;
			callback(result);
		});
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

	main() {
		// this.options.example? this._create_main("com.yahoo.elide.example"): this._prompting();

		this._create_model();

		// var flag_done = false;
		
		// new_model_attributes = [];
		// this._model(new_model_attributes);
	}

	// 	// var project = {
	// 	// 	name: "com.yahoo.elide.example"
	// 	// }

	// 	// var file = project.name.split('.').join('/');
	// 	// // Create the main.java file
	// 	// this.fs.copyTpl(
	// 	// 	this.templatePath("main.java"),
	// 	// 	this.destinationPath("src/main/java/" + file + "/main.java"),
	// 	// 	{}
	// 	// );
	// 	// // Create the model folder
	// 	// this.fs.copyTpl(
	// 	// 	this.templatePath("test.txt"),
	// 	// 	this.destinationPath("src/test/java/" + file + "/models/test.txt"),
	// 	// 	{}
	// 	// );
	// 	// // Create the checks folder
	// 	// this.fs.copyTpl(
	// 	// 	this.templatePath("test.txt"),
	// 	// 	this.destinationPath("src/main/java/" + file + "/checks/test.txt"),
	// 	// 	{}
	// 	// );

	// 	// // Create the test models folder
	// 	// this.fs.copyTpl(
	// 	// 	this.templatePath("test.txt"),
	// 	// 	this.destinationPath("src/test/java/" + file + "/models/test.txt"),
	// 	// 	{}
	// 	// );
	// 	// // Create the test checks folder
	// 	// this.fs.copyTpl(
	// 	// 	this.templatePath("test.txt"),
	// 	// 	this.destinationPath("src/test/java/" + file + "/checks/test.txt"),
	// 	// 	{}
	// 	// );

	// _create_models(model_name, models) {
	// 	for(var i=0; i<models.length; i++) {
	// 		this.fs.copyTpl(
	// 			this.templatePath("model.java"),
	// 			this.destinationPath("src/main/java/com/testapp/models/" + model_name + ".java"),
	// 			{
	// 				name 	: models[i].name,
	// 				id_type	: models[i].type
	// 			}
	// 		);
	// 	}
	// }

	// prompting() {
	// 	var models = [];
	// 	var model_name;

	// 	this.prompt([{
	// 		type	: 'confirm',
	// 		name	: 'model',
	// 		message : 'Want to create a model?'
	// 	}]).then((answer) => {
	// 		if(answer.model == true) {
	// 			this.prompt([{
	// 				type	: 'input',
	// 				name	: 'model_name',
	// 				message : 'Name of Model?'
	// 			}]).then((answer) => {
	// 				model_name = answer.model_name;
	// 				models.append(_model(model_name, models));
	// 			});
	// 		} else {
	// 			done = true;
	// 		}
	// 	});
	// }

	// 	_create_models(model_name, models);
};
