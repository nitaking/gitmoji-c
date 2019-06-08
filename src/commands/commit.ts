import {Command} from '@oclif/command'
import {prompt} from 'enquirer'
import * as execa from 'execa'

interface IAnswer {
  gitmoji: string
  title: string
  message: string
}

export default class Hello extends Command {
  static description = 'Interactively commit using the prompts'

  async run() {
    const answer: IAnswer = await prompt([
      {
        type: 'input',
        name: 'gitmoji',
        message: 'Choose a gitmoji:', // todo: sourceにして、gitmojiAPIの結果を載せる
      },
      {
        type: 'input',
        name: 'title',
        message: 'Enter the commit title',
      },
      {
        type: 'input',
        name: 'message',
        message: 'Enter the commit message:',
      },
    ])

    const title = `${answer.gitmoji} ${answer.title}`
    const body = `${answer.message}`

    try {
      const result = await this.commit(title, body)
      this.log(result)
    } catch (e) {
      this.errorMessage(e)
    }
  }

  private async commit(title: string, message: string) {
    const {stdout} = await execa('git', this.getCommitMessage(title, message))
    return stdout
  }

  private getCommitMessage(title: string, message: string) {
    return [
      'commit',
      '-m',
      title,
      '-m',
      message,
    ]
  }

  private errorMessage(message: string) {
    this.error(message, {exit: 2})
  }
}
