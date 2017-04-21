var generator = require('./generator');

var new_model_attributes = {name: "", schemas: [] };

function schema_promt(yo) {
	return yo.prompt([{
		type	: 'input',
		name	: 'name',
		message : 'Schema Name'
	},{
		name	: 'type',
		message : 'What type?',
		type	: 'list',
		choices : [
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
		new_model_attributes.schemas.push({name: model.name, type: model.type});
		yo.prompt([{
			type	: 'confirm',
			name	: 'continue',
			message : 'Add another schema?'
		}]).then((response) => {

			if (response.continue === true) {
				// console.log("yes");
				schema_promt(yo);
			}
			else {
				create_model(yo);
			}
		});
	});
}

function model_prompt(yo) {
	return yo.prompt([{
		type	: 'input',
		name	: 'name',
		message : 'Model Name?'
	},]).then((model) => {

		new_model_attributes.name = model.name;

		schema_promt(yo);

	});
}

function create_model(yo) {
	yo.fs.copyTpl(
		yo.templatePath("model.java"),
		yo.destinationPath("model.java"),
		new_model_attributes
	);
    generator.generate_new_project(yo, project_name, package_name);
}

module.exports = {
    schema_promt: schema_promt,
    model_prompt: model_prompt,
    create_model: create_model,
    new_model_attributes: new_model_attributes
}
