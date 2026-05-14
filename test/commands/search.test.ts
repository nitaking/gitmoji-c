import {describe, expect, it} from 'vitest'
import {execa} from 'execa'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const bin = resolve(__dirname, '../../bin/run')

describe('search command', () => {
  it('should find matching gitmojis', async () => {
    const {stdout} = await execa(bin, ['search', 'bug'], {env: {NODE_ENV: 'production'}})
    expect(stdout).toContain('🐛')
  })

  it('should show message when no results found', async () => {
    const {stdout} = await execa(bin, ['search', 'zzzznotfound'], {env: {NODE_ENV: 'production'}})
    expect(stdout).toContain('No gitmojis found')
  })
})
