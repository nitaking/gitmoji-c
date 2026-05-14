[![CI](https://github.com/nitaking/gitmoji-c/actions/workflows/ci.yml/badge.svg)](https://github.com/nitaking/gitmoji-c/actions/workflows/ci.yml)
[![Version](https://img.shields.io/npm/v/gitmoji-c.svg)](https://npmjs.org/package/gitmoji-c)
[![Downloads/week](https://img.shields.io/npm/dw/gitmoji-c.svg)](https://npmjs.org/package/gitmoji-c)

# gitmoji-c

gitmoji-c is a [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) clone tool that does not use gpg.

![2019-06-21 09 44 06](https://user-images.githubusercontent.com/10850034/59889833-35d0be80-9409-11e9-93b1-dd76da26d442.gif)

## Requirements

- Node.js >= 20

## Install

```
$ pnpm add -g gitmoji-c
```

or

```
$ npm i -g gitmoji-c
```

## Usage

```
$ gitmoji --help
```

### Commit

Interactively commit using gitmoji prompts.

```
$ gitmoji commit
```

![2019-06-19 07 40 52](https://user-images.githubusercontent.com/10850034/59724737-dedeb400-9265-11e9-9d39-76beec62f99c.gif)

### List

List all available gitmojis.

```
$ gitmoji list
```

### Search

Search gitmojis by keyword.

```
$ gitmoji search bug
🐛 - :bug: - Fix a bug.
```

Without arguments, launches interactive autocomplete search:

```
$ gitmoji search
? Search gitmojis: (type to filter)
```

## License

MIT
