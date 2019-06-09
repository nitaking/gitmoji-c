import {Command} from '@oclif/command'
// import {AutoComplete, prompt} from 'enquirer'
import * as execa from 'execa'
import * as inquirer from 'inquirer'

import {questions} from '../prompt'

inquirer.registerPrompt(
  'autocomplete', require('inquirer-autocomplete-prompt')
)

export default class Commit extends Command {
  static description = 'Interactively commit using the prompts'

  async run() {
    try {
      // @ts-ignore
      const answer = await inquirer.prompt(questions)

      const title = `${answer.gitmoji} ${answer.title}`
      const body = `${answer.message}`

      const result = await this.commit(title, body)
      this.log(result)
    } catch (e) {
      this.errorMessage(e)
    }
  }

  private async commit(title: string, message: string) {
    const {stdout} = await execa('git', [
      'commit',
      '-m',
      title,
      '-m',
      message,
    ])
    return stdout
  }

  private errorMessage(message: string) {
    this.error(message, {exit: 2})
  }
}
