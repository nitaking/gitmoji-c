gitmoji-c
=========

gitmoji cli tool.

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![Version](https://img.shields.io/npm/v/gitmoji-c.svg)](https://npmjs.org/package/gitmoji-c)
[![CircleCI](https://circleci.com/gh/nitaking/gitmoji-c/tree/master.svg?style=shield)](https://circleci.com/gh/nitaking/gitmoji-c/tree/master)
[![Downloads/week](https://img.shields.io/npm/dw/gitmoji-c.svg)](https://npmjs.org/package/gitmoji-c)
[![License](https://img.shields.io/npm/l/gitmoji-c.svg)](https://github.com/nitaking/gitmoji-c/blob/master/package.json)

<!-- toc -->
* [Usage](#usage)
* [Commands](#commands)
<!-- tocstop -->
# Usage
<!-- usage -->
```sh-session
$ npm install -g gitmoji-c
$ gitmoji COMMAND
running command...
$ gitmoji (-v|--version|version)
gitmoji-c/0.0.0 darwin-x64 node-v10.16.0
$ gitmoji --help [COMMAND]
USAGE
  $ gitmoji COMMAND
...
```
<!-- usagestop -->
# Commands
<!-- commands -->
* [`gitmoji hello [FILE]`](#gitmoji-hello-file)
* [`gitmoji help [COMMAND]`](#gitmoji-help-command)

## `gitmoji hello [FILE]`

describe the command here

```
USAGE
  $ gitmoji hello [FILE]

OPTIONS
  -f, --force
  -h, --help       show CLI help
  -n, --name=name  name to print

EXAMPLE
  $ gitmoji hello
  hello world from ./src/hello.ts!
```

_See code: [src/commands/hello.ts](https://github.com/nitaking/gitmoji-c/blob/v0.0.0/src/commands/hello.ts)_

## `gitmoji help [COMMAND]`

display help for gitmoji

```
USAGE
  $ gitmoji help [COMMAND]

ARGUMENTS
  COMMAND  command to show help for

OPTIONS
  --all  see all commands in CLI
```

_See code: [@oclif/plugin-help](https://github.com/oclif/plugin-help/blob/v2.2.0/src/commands/help.ts)_
<!-- commandsstop -->
