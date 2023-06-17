# node-cli

A playground for studying and creating node.js command line tools.

## prerequisites

If you have never done command-line tool developement with npm before, here are some tips:

When you `npm install -g {package}`, the source code of the package in linux environment goes to `/usr/bin/node_modules`, a symbolic link under a location in $PATH (`/usr/bin/{package}`) is also created for its main executable file. For example:

```sh
$npm -g prisma
$which prisma
#/usr/bin/prisma
$ls -l /usr/bin/prisma
#/usr/bin/prisma -> /lib/node_modules/prisma/build/index.js
```

The command name and the path to the main executable file is specified in `package.json`

```json
{
  ...
  "bin": {
    "prisma": "build/index.js",
    "prisma2": "build/index.js"
  }
  ...
}
```

For a command, like `npm install prisma`, The execution process is approximately like this:

- shell parses npm
- shell finds npm in environment variables
- go from the link to the executable file of npm (usr/lib/node_modules/npm/bin/npm-cli.js)
- shell uses node to execute npm-cli.js (#!/usr/bin/env node on top of it)
- npm-cli.js parses command / options
- npm-cli exeuctes command
- finish and exit

There are several ways to play around with home-made commands locally,

```sh
# /my-command
# ../package.json ({ "bin": { "my-command": "bin/main.js" }})
# ../bin
# ../../main.js

# cd to /my-command
$npm link # sudo
$my-command # call globally

# Or
# cd ..
$npm i -g my-command
$my-command # call globally

# to reverse(unlink)
$npm unlink -g my-command

# to list all global commands created by npm
$npm ls -g

# to use my-command as a dependency of my-other-command
# under /my-other-command
$npm link my-command # then add it to dependencies in package.json manually
$npm unlink my-command # to reverse

# to publish
$npm login
$npm publish
```

## /test

/test includes a bunch of entries for experimenting with packages or node.js features that support command line development(sometimes with the usage, sometimes with the source code).

- commander, yargs: general command-line functionalities
- inquirer: prompts
- chalk: coloring
- ora: spinner
- workspace, learna: package management
- how to use Common JS and ES module together without creating conflicts

## @ncli

A CLI tool created for the purpose of generic CLI development.

- encapsulates command implementation
- handles logging, debugging
  See ncli/README for more details...
