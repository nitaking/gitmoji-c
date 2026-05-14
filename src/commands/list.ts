import {Args, Command, Flags} from '@oclif/core'
import chalk from 'chalk'

import {gitmojis} from '../utils.js'

interface IGitmoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
}

export default class List extends Command {
  static description = 'List all the available gitmojis'

  static args = {
    search: Args.string({description: 'search query'}),
  }

  static flags = {
    search: Flags.string({char: 's', description: 'search query'}),
  }

  async run() {
    try {
      const emojiList = await gitmojis()
      const {args, flags} = await this.parse(List)
      const query = args.search || flags.search

      if (query) {
        this.search(emojiList, query)
      } else {
        this.printGitmojis(emojiList)
      }
    } catch (error: any) {
      this.error(error.message || error, {exit: 2})
    }
  }

  private printGitmojis(list: IGitmoji[]) {
    for (const gitmoji of list) {
      const {emoji, code, description} = gitmoji
      this.log(`${emoji} - ${chalk.blue(code)} - ${description}`)
    }
  }

  private search(list: IGitmoji[], query: string) {
    const filtered = list.filter((gitmoji: IGitmoji) => {
      const text = gitmoji.name.concat(gitmoji.description).concat(gitmoji.code).concat(gitmoji.emoji).toLowerCase()
      return text.includes(query.toLowerCase())
    })
    this.printGitmojis(filtered)
  }
}
