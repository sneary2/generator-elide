var Generator = require('yeoman-generator');

function model() {
	this.name = null;
	this.type = null;
}

module.exports = class extends Generator {
	// The name `constructor` is important here
		constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);
	}

	// prompting() {
	// 	return this.prompt([{
	// 		type    : 'input',
	// 		name    : 'name',
	// 		message : 'Your project name',
	// 		default : this.appname // Default to current folder name
	// 	}, {
	// 		type    : 'confirm',
	// 		name    : 'cool',
	// 		message : 'Would you like to enable the Cool feature?'
	// 	}, {
	// 		type	: 'list',
	// 		name	: 'database',
	// 		message	: 'Choose a database system',
	// 		choices	: ['MongoDB', 'MySQL', 'PostgreSQL', 'SQLite']
	// 	}]).then((answers) => {
	// 		// writing(answers);
	// 		this.fs.copyTpl(
	// 			this.templatePath('index.html'),
	// 			this.destinationPath('public/test.cpp'), {
	// 				project_name: answers.name,
	// 				cool_feature: answers.cool,
	// 				database	: answers.database
	// 			}
	// 		);
	// 	});
	// }

// 	com.testapp
// src/
//     main/
//         java/
//             com/
//                 testapp/
//                     models/
//                     checks/ (security checks; an elide object; example: is author? (patch operation))
//                     main.java
//                     elideResourceConfig.java
//     test/
//         java/
//             com/
//                 testapp/
//                     models/   
//                     checks/

	create_main() {
		this.prompt([{
			type	: 'input',
			name	: 'name',
			message : 'Project Name?'
		}]).then((project) => {
			var file = project.name.replace('.', '/');
			this.fs.copyTpl(
				this.templatePath("main.java"),
				this.destinationPath("src/main/java/" + file + "/main.java"),
				{}
			);
			this.fs.copyTpl(
				this.templatePath("test.txt"),
				this.destinationPath("src/test/java/" + file + "/models/test.txt"),
				{}
			);
			this.fs.copyTpl(
				this.templatePath("test.txt"),
				this.destinationPath("src/main/java/" + file + "/checks/test.txt"),
				{}
			);

			this.fs.copyTpl(
				this.templatePath("test.txt"),
				this.destinationPath("src/test/java/" + file + "/models/test.txt"),
				{}
			);
			this.fs.copyTpl(
				this.templatePath("test.txt"),
				this.destinationPath("src/test/java/" + file + "/checks/test.txt"),
				{}
			);
		});
	}
		
		

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
