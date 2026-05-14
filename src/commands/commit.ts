import {Command} from '@oclif/core'
import {execa} from 'execa'
import inquirer from 'inquirer'
import autocomplete from 'inquirer-autocomplete-prompt'

import {questions} from '../prompt.js'

inquirer.registerPrompt('autocomplete', autocomplete)

export default class Commit extends Command {
  static description = 'Interactively commit using the prompts'

  async run() {
    try {
      const answer: any = await inquirer.prompt(questions)

      const title = `${answer.gitmoji} ${answer.title}`
      const body = `${answer.message}`

      const result = await this.commit(title, body)
      this.log(result)
    } catch (e: any) {
      this.error(e.message || e, {exit: 2})
    }
  }

  private async commit(title: string, message: string) {
    const {stdout} = await execa('git', ['commit', '-m', title, '-m', message])
    return stdout
  }
}
