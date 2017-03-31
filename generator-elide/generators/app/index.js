var Generator = require('yeoman-generator');

function model() {
	this.name = null;
	this.type = null;
}

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

	_create_main() {

		var project = {
			name: "com.yahoo.elide.example"
		}

		var file = project.name.split('.').join('/');
		// Create the main.java file
		this.fs.copyTpl(
			this.templatePath("blog-example/Main.java"),
			this.destinationPath("src/main/java/" + file + "/Main.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/ElideResourceConfig.java"),
			this.destinationPath("src/main/java/" + file + "/ElideResourceConfig.java"),
			{}
		);

		// Init the models folder blog-example
		this.fs.copyTpl(
			this.templatePath("blog-example/Comment.java"),
			this.destinationPath("src/main/java/" + file + "/models/Comment.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/Post.java"),
			this.destinationPath("src/main/java/" + file + "/models/Post.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/Role.java"),
			this.destinationPath("src/main/java/" + file + "/models/Role.java"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/User.java"),
			this.destinationPath("src/main/java/" + file + "/models/User.java"),
			{}
		);

		// Don't know what this is
		this.fs.copyTpl(
			this.templatePath("blog-example/hibernate.cfg.xml"),
			this.destinationPath("src/resources/hibernate.cfg.xml"),
			{}
		);
		this.fs.copyTpl(
			this.templatePath("blog-example/log4j2.xml"),
			this.destinationPath("src/resources/log4j2.xml"),
			{}
		);

		this.fs.copyTpl(
			this.templatePath("blog-example/load_blog.sh"),
			this.destinationPath("src/scripts/load_blog.sh"),
			{}
		);

		// create the pom file
		this.fs.copyTpl(
			this.templatePath("template-pom.xml"),
			this.destinationPath("pom.xml"),
			{}
		);
	}

	main() {
		this.options.example? this._create_main(): this._prompting();

	}
		// var project = {
		// 	name: "com.yahoo.elide.example"
		// }

		// var file = project.name.split('.').join('/');
		// // Create the main.java file
		// this.fs.copyTpl(
		// 	this.templatePath("main.java"),
		// 	this.destinationPath("src/main/java/" + file + "/main.java"),
		// 	{}
		// );
		// // Create the model folder
		// this.fs.copyTpl(
		// 	this.templatePath("test.txt"),
		// 	this.destinationPath("src/test/java/" + file + "/models/test.txt"),
		// 	{}
		// );
		// // Create the checks folder
		// this.fs.copyTpl(
		// 	this.templatePath("test.txt"),
		// 	this.destinationPath("src/main/java/" + file + "/checks/test.txt"),
		// 	{}
		// );

		// // Create the test models folder
		// this.fs.copyTpl(
		// 	this.templatePath("test.txt"),
		// 	this.destinationPath("src/test/java/" + file + "/models/test.txt"),
		// 	{}
		// );
		// // Create the test checks folder
		// this.fs.copyTpl(
		// 	this.templatePath("test.txt"),
		// 	this.destinationPath("src/test/java/" + file + "/checks/test.txt"),
		// 	{}
		// );


	// _model() {
	// 	var new_model = model();
	// 	this.prompt([{
	// 		type	: 'input',
	// 		name	: 'name',
	// 		message : 'Model Name?'
	// 	},{
	// 		name	: 'type',
	// 		message : 'Want to create a model perhaps?',
	// 		type	: 'list',
	// 		choices: [
	// 			"String",
	// 			"Int",
	// 			"Short",
	// 			"Float",
	// 			"Double",
	// 			"Long",
	// 			"Long long",
	// 			"Boolean",
	// 			"Char"
	// 		   ]
	// 	}]).then((model) => {
	// 		new_model.name = model.name;
	// 		new_model.type = model.type
	// 		this.log(model.name);
	// 		this.log(model.type);
	// 	});
	// 	return new_model;
	// }

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
