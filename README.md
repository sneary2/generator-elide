# elide-boot
```sh
_____ _ _   _        _____         _
|   __| |_|_| |___   | __  |___ ___| |_
|   __| | | . | -_|  | __ -| . | . |  _|
|_____|_|_|___|___|  |_____|___|___|_|  
                                        v.1.0
```

## Requirements
Run on a 64 bit (Mac OSX/Linux/Windows) system with Node.js installed.

## Using elide-boot (Getting Started)

#### To get started with the project:

1. Clone the project on to your system.

2. Install npm.

	```sh
    $ generator-elide> npm install
    $ generator-elide> npm link
    ```

    This creates node-modules in the current directory and links to the yeoman generator.

3. Run yo elide and choose one of the options.

    ```sh
    $ generator-elide> yo elide
    ```

4. For creating an example, change to the elide-blog-example directory and run mvn.

    ```sh
    $ generator-elide> cd elide-blog-example/
    $ elide-blog-example> mvn install
    $ elide-blog-example> mvn exec:java -Dexec.mainClass="com.yahoo.elide.example.Main"
    ```

5. For creating new project, change to the <Name> directory and run mvn.

    ```sh
    $ generator-elide> cd <Name>/
    $ elide-blog-example> mvn install
    $ elide-blog-example> mvn exec:java -Dexec.mainClass="<groupId>.Main"
    ```

## Developers (Open-Source)

Feel free to contribute to this project. This project is Open-Source under the Apache License, Version 2.0.  

## Contributors (About the project)
This project is part of the class CS397 (Open-Source development) at the University of Illinois at Urbana-Champaign. The project was in partnership with Yahoo! Inc. at the Research Park, Champaign, IL.

**Mentors**
- Dan Chen
- Jon Kilroy

**Contributors**
- Akashdeep Deb
- Phillip Quy Le
- Shane Neary

## License

Copyright 2017, Yahoo Inc.

Licensed under the Apache License, Version 2.0

The use and distribution terms for this software are covered by the Apache License, Version 2.0 [http://www.apache.org/licenses/LICENSE-2.0.html](http://www.apache.org/licenses/LICENSE-2.0.html]).
