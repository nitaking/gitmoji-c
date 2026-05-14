import {Args, Command} from '@oclif/core'
import chalk from 'chalk'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'

import {gitmojis} from '../utils.js'

interface IGitmoji {
  emoji: string
  code: string
  description: string
  name: string
}

inquirer.registerPrompt('autocomplete', autocomplete)

export default class Search extends Command {
  static description = 'Search gitmojis by keyword (interactive without args)'

  static args = {
    query: Args.string({description: 'search keyword'}),
  }

  async run() {
    const {args} = await this.parse(Search)
    const list = await gitmojis()

    if (args.query) {
      this.staticSearch(list, args.query)
    } else {
      await this.interactiveSearch(list)
    }
  }

  private staticSearch(list: IGitmoji[], query: string) {
    const filtered = list.filter((g) => {
      const text = g.name.concat(g.description).toLowerCase()
      return text.includes(query.toLowerCase())
    })

    if (filtered.length === 0) {
      this.log(`No gitmojis found for "${query}"`)
      return
    }

    for (const g of filtered) {
      this.log(`${g.emoji} - ${chalk.blue(g.code)} - ${g.description}`)
    }
  }

  private async interactiveSearch(list: IGitmoji[]) {
    const {gitmoji} = await inquirer.prompt([
      {
        name: 'gitmoji',
        message: 'Search gitmojis:',
        type: 'autocomplete',
        source(_: any, input: string) {
          const filtered = list.filter((g: IGitmoji) => {
            const text = g.name.concat(g.description).concat(g.code).toLowerCase()
            return !input || text.includes(input.toLowerCase())
          })
          return filtered.map((g: IGitmoji) => ({
            name: `${g.emoji}  - ${g.code} - ${g.description}`,
            value: `${g.emoji} ${g.code}`,
          }))
        },
      },
    ])

    this.log(`\n${gitmoji}`)
  }
}
