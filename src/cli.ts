#!/usr/bin/env -S deno run --allow-net --allow-read --allow-write --allow-run
import {execSync} from 'node:child_process'

import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'

import {questions} from './prompt.js'
import {type Gitmoji, fetchRemoteGitmojis, gitmojis, saveCache} from './utils.js'

inquirer.registerPrompt('autocomplete', autocomplete)

async function commit() {
  const answer: any = await inquirer.prompt(questions)
  const title = `${answer.gitmoji} ${answer.title}`
  const body = `${answer.message}`
  const stdout = execSync(`git commit -m "${title}" -m "${body}"`, {encoding: 'utf-8'})
  console.log(stdout)
}

async function list(query?: string) {
  const emojiList: Gitmoji[] = await gitmojis()
  const filtered = query
    ? emojiList.filter((g) => g.name.concat(g.description).concat(g.code).concat(g.emoji).toLowerCase().includes(query.toLowerCase()))
    : emojiList
  for (const g of filtered) {
    console.log(`${g.emoji} - ${g.code} - ${g.description}`)
  }
}

async function search(query?: string) {
  if (query) {
    await list(query)
    return
  }

  const emojiList: Gitmoji[] = await gitmojis()
  const {gitmoji} = await inquirer.prompt([
    {
      name: 'gitmoji',
      message: 'Search gitmojis:',
      type: 'autocomplete',
      source(_: any, input: string) {
        const filtered = emojiList.filter((g: Gitmoji) => {
          const text = g.name.concat(g.description).concat(g.code).toLowerCase()
          return !input || text.includes(input.toLowerCase())
        })
        return filtered.map((g: Gitmoji) => ({
          name: `${g.emoji}  - ${g.code} - ${g.description}`,
          value: `${g.emoji} ${g.code}`,
        }))
      },
    },
  ])
  console.log(`\n${gitmoji}`)
}

async function update() {
  console.log('Fetching gitmojis...')
  const data = await fetchRemoteGitmojis()
  saveCache(data)
  console.log(`Updated: ${data.length} gitmojis cached locally.`)
}

function help() {
  console.log(`gitmoji-c - A gitmoji interactive client

Usage:
  gitmoji <command> [options]

Commands:
  commit    Interactively commit using gitmoji prompts
  list      List all available gitmojis
  search    Search gitmojis by keyword
  update    Update the local gitmoji cache
  help      Show this help message`)
}

const [command, ...args] = process.argv.slice(2)

switch (command) {
  case 'commit':
  case 'c':
    await commit()
    break
  case 'list':
  case 'l':
    await list(args[0])
    break
  case 'search':
  case 's':
    await search(args[0])
    break
  case 'update':
  case 'u':
    await update()
    break
  default:
    help()
}
