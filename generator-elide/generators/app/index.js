var Generator = require('yeoman-generator');

function model() {
	this.name = null;
	this.type = null;
}

module.exports = class extends Generator {
	constructor(args, opts) {
		// Calling the super constructor is important so our generator is correctly set up
		super(args, opts);

        this.option('example');		// Option flag to generate an example
		this.option('create');		// Option flag to create a new project
		this.option('info');		// Option flag to show Elide boot info
	}

	_prompting() {
		return this.prompt([{
			type	: 'list',
			name	: 'command',
			message	: 'Choose an option below',
			choices	: ['Try an example', 'Create new project']
		}]).then((answers) => {
			if (answers.command === 'Try an example') {
				// Generate an example
				this._create_main();
			}
			else {
				// Ask questions when creating a new project
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

	_create_main() {

		var project = {
			name: "com.yahoo.elide.example"
		}

		var file = project.name.split('.').join('/');
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

	main() {
		if (this.options.example) {
			console.log("Generate an example");
			this._create_main();
		}
		else if (this.options.create) {
			console.log("Create a new project");
		}
		else if (this.options.info){
			console.log("Elide Boot is a command line interface (CLI) for Yahoo! Elide libary");
			console.log("Author: Deez Nuts");
			console.log("Version: 1.0.0");
			console.log("Contact: lame_email@suspicious-server.com");
		}
		else {
			this._prompting();
		}
	}
};
