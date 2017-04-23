const generator = require('./generator');

const choicesArr = [
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

const models = [];

let newModelAttributes = {
  name: '',
  schemas: []
};

const schemaPrompt = (yo, projectName, packageName) => {
	return yo.prompt([{
		type: 'input',
		name: 'name',
		message: 'Schema Name'
	}, {
		name: 'type',
		message: 'What type?',
		type: 'list',
		choices: choicesArr
	}]).then((model) => {
		newModelAttributes.schemas.push({
      name: model.name,
      type: model.type
    });
		yo.prompt([{
			type: 'confirm',
			name: 'continue',
			message: 'Add another schema?'
		}]).then((response) => {
			if (response.continue) {
				schemaPrompt(yo, projectName, packageName);
			} else {
				models.push(newModelAttributes);
				choicesArr.push(newModelAttributes.name);
				newModelAttributes = {
          name: '',
          schemas: []
        };
				yo.prompt([{
						type: 'confirm',
						name: 'addAnother',
						message: 'Add another model?'
				}]).then((answer) => {
					if(answer.addAnother) {
						modelPrompt(yo, projectName, packageName);
					} else {
						createModels(yo, projectName, packageName)
					}
				});
			}
		});
	});
}

const modelPrompt = (yo, projectName, packageName) => {
	yo.prompt([{
		type: 'input',
		name: 'name',
		message: 'Model Name?'
	},]).then((model) => {
		newModelAttributes.name = model.name;
		schemaPrompt(yo, projectName, packageName);
	});
}

const createModels = (yo, projectName, packageName) => {
	const file = packageName.split('.').join('/')
	models.forEach((model) => {
    yo.fs.copyTpl(
      yo.templatePath('model.java'),
      yo.destinationPath(`${projectName}/src/main/java/${file}/models/${model.name}.java`),
      model
    );
  });

  generator.generateNewProject(yo, projectName, packageName);
}

module.exports = {
  modelPrompt,
  newModelAttributes
}
