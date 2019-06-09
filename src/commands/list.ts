import {Command, flags} from '@oclif/command'
import axios from 'axios'
import chalk from 'chalk'

interface IGitmoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
}

const base = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

export default class List extends Command {
  static description = 'List all the available gitmojis'
  static args = [{name: 'search'}]
  static flags = {
    search: flags.string({char: 's', description: 'search query'}),
  }

  async run() {
    try {
      const gitmojis = await this.get()
      const {args, flags} = this.parse(List)
      const query = args.search || flags.search

      if (query) {
        this.search(gitmojis, query)
      } else {
        this.printGitmojis(gitmojis)
      }
    } catch (error) {
      this.errorMessage(error)
    }
  }

  private errorMessage(message: string) {
    this.error(message, {exit: 2})
  }

  private printGitmojis(gitmojis: IGitmoji[]) {
    try {
      gitmojis.forEach(gitmoji => {
        const {emoji, code, description} = gitmoji
        this.log(`${emoji} - ${chalk.blue(code)} - ${description}`)
      })
    } catch (error) {
      this.errorMessage(`gitmoji list not found - ${error.code}`)
    }
  }

  private search(gitmojis: IGitmoji[], query: string) {
    const filterd = gitmojis.filter((gitmoji: IGitmoji) => {
      const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
      return (emoji.indexOf(query.toLowerCase()) !== -1)
    })
    this.printGitmojis(filterd)
  }

  private async get() {
    try {
      const res = await base.get('/src/data/gitmojis.json')
      this.log(`${chalk.yellow('Gitmojis')} updated successfully!`)

      return res.data.gitmojis

    } catch (error) {
      this.log(`Network connection not found - ${error.code}`)
    }
  }
}
