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
		// yo.log("Hello");
		// yo.log(model.name);
		// yo.log(model.type);
		new_model_attributes.schemas.push({name: model.name, type: model.type});
		// yo._dezznuts();
		// var my_func = yo._model;
		yo.prompt([{
			type	: 'confirm',
			name	: 'continue',
			message : 'Add another attribute?'
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
		// new_model_attributes.push({model.name , model.type})s
		// yo.log("Hello");
		// yo.log(model.name);
		// yo.log(model.type);
		new_model_attributes.name = model.name;
		// yo._dezznuts();
		// var my_func = yo._model;
		yo.prompt([{
			type	: 'confirm',
			name	: 'continue',
			message : 'Add attribute?'
		}]).then((response) => {

			if (response.continue === true) {
				// console.log("yes");
				schema_promt(yo);
			}
			else {
				console.log("Shane is gay");
			}
		});
	});
}

function create_model(yo, model) {
	yo.fs.copyTpl(
		yo.templatePath("model.java"),
		yo.destinationPath("model.java"),
		model
	);
}

module.exports = {
    schema_promt: schema_promt,
    model_prompt: model_prompt,
    create_model: create_model,
    new_model_attributes: new_model_attributes
}
