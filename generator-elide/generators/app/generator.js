// Generate an example
function generate_example_project(yo, project_name) {

    var file = project_name.split('.').join('/');
    // Create the main.java file
    yo.fs.copyTpl(
        yo.templatePath("blog-example/Main.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/Main.java"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/ElideResourceConfig.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/ElideResourceConfig.java"),
        {}
    );

    // Init the models folder blog-example
    yo.fs.copyTpl(
        yo.templatePath("blog-example/Comment.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Comment.java"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/Post.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Post.java"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/Role.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/Role.java"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/User.java"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/main/java/" + file + "/models/User.java"),
        {}
    );

    // Don't know what this is
    yo.fs.copyTpl(
        yo.templatePath("blog-example/hibernate.cfg.xml"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/resources/hibernate.cfg.xml"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/log4j2.xml"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/resources/log4j2.xml"),
        {}
    );

    yo.fs.copyTpl(
        yo.templatePath("blog-example/load_blog.sh"),
        yo.destinationPath("elide/elide-example/elide-blog-example/src/scripts/load_blog.sh"),
        {}
    );

    // create the pom files
    yo.fs.copyTpl(
        yo.templatePath("pom_files/elide-example-blog-pom.xml"),
        yo.destinationPath("elide/elide-example/elide-blog-example/pom.xml"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("pom_files/elide-example-pom.xml"),
        yo.destinationPath("elide/elide-example/pom.xml"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("pom_files/elide-pom.xml"),
        yo.destinationPath("elide/pom.xml"),
        {}
    );
}

function generate_new_project(yo, project_name, package_name) {
    var file = package_name.split('.').join('/');
    // Create the main.java file
    yo.fs.copyTpl(
        yo.templatePath("blog-example/Main.java"),
        yo.destinationPath(project_name + "/src/main/java/" + file + "/Main.java"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/ElideResourceConfig.java"),
        yo.destinationPath(project_name + "/src/main/java/" + file + "/ElideResourceConfig.java"),
        {}
    );

    // Don't know what this is
    yo.fs.copyTpl(
        yo.templatePath("blog-example/hibernate.cfg.xml"),
        yo.destinationPath(project_name + "/src/resources/hibernate.cfg.xml"),
        {}
    );
    yo.fs.copyTpl(
        yo.templatePath("blog-example/log4j2.xml"),
        yo.destinationPath(project_name + "/src/resources/log4j2.xml"),
        {}
    );

    yo.fs.copyTpl(
        yo.templatePath("blog-example/load_blog.sh"),
        yo.destinationPath(project_name + "/src/scripts/load_blog.sh"),
        {}
    );

    // create the pom file
    // TODO: Should create a generic pom file
    // e.g. to download elide and its dependencies

    // yo.fs.copyTpl(
    // 	yo.templatePath("template-pom.xml"),
    // 	yo.destinationPath("pom.xml"),
    // 	{}
    // );
}

module.exports = {
    generate_example_project: generate_example_project,
    generate_new_project: generate_new_project
}
