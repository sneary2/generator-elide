var generator = require('./generator');

var models = [];
var choices_arr = [
			'String',
			'Int',
			'Short',
			'Float',
			'Double',
			'Long',
			'Long long',
			'Boolean',
			'Char'
		   ];


var new_model_attributes = {name: '', schemas: [] };

function schemaPrompt(yo, project_name, package_name) {
	return yo.prompt([{
		type	: 'input',
		name	: 'name',
		message : 'Schema Name'
	},{
		name	: 'type',
		message : 'What type?',
		type	: 'list',
		choices : choices_arr
	}]).then((model) => {
		new_model_attributes.schemas.push({name: model.name, type: model.type});
		yo.prompt([{
			type	: 'confirm',
			name	: 'continue',
			message : 'Add another schema?'
		}]).then((response) => {

			if (response.continue === true) {
				// console.log('yes');
				schemaPrompt(yo, project_name, package_name);
			} else {
				models.push(new_model_attributes);
				choices_arr.push(new_model_attributes.name);
				new_model_attributes = {name: '', schemas: [] };
				// createModels(yo, project_name, package_name);
				yo.prompt([{
						type	: 'confirm',
						name	: 'add_another',
						message : 'Add another model?'
				}]).then((answer) => {
					if(answer.add_another) {
						modelPrompt(yo, project_name, package_name);
					} else {
						createModels(yo, project_name, package_name)
					}
				})
			}
		});
	});
}

// function continue_making_models(yo, project_name, package_name) {
// 	yo.prompt([{
// 			type	: 'confirm',
// 			name	: 'add_another',
// 			message : 'Add another model?'
// 	},]).then((answer) => {
// 		if(answer.add_another) {
// 			modelPrompt
// 		}
// 	}
// }

function modelPrompt(yo, project_name, package_name) {
	// var done_adding_models = false;
	// while(!done_adding_models) {
		yo.prompt([{
			type	: 'input',
			name	: 'name',
			message : 'Model Name?'
		},]).then((model) => {

			new_model_attributes.name = model.name;

			schemaPrompt(yo, project_name, package_name);
		});
	// }
}

function createModels(yo, project_name, package_name) {
	var file = package_name.split('.').join('/')
	models.forEach(
		function(model) {
			yo.fs.copyTpl(
				yo.templatePath('model.java'),
				yo.destinationPath(project_name + '/src/main/java/' + file + '/models/' + model.name + '.java'),
				model
			);
		}
	);

    generator.generateNewProject(yo, project_name, package_name);
}

module.exports = {
    // schemaPrompt: schemaPrompt,
    modelPrompt: modelPrompt,
    // createModels: createModels,
    new_model_attributes: new_model_attributes
}
