import {Command} from '@oclif/core'

import {fetchRemoteGitmojis, saveCache} from '../utils.js'

export default class Update extends Command {
  static description = 'Update the local gitmoji cache'

  async run() {
    this.log('Fetching gitmojis...')
    const data = await fetchRemoteGitmojis()
    saveCache(data)
    this.log(`Updated: ${data.length} gitmojis cached locally.`)
  }
}
