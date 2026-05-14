import {describe, expect, it} from 'vitest'
import {execa} from 'execa'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const bin = resolve(__dirname, '../../bin/run')

describe('list command', () => {
  it('should list all gitmojis', async () => {
    const {stdout} = await execa(bin, ['list'], {env: {NODE_ENV: 'production'}})
    expect(stdout).toContain('🎨')
    expect(stdout).toContain('🐛')
  })

  it('should search gitmojis by keyword', async () => {
    const {stdout} = await execa(bin, ['list', 'bug'], {env: {NODE_ENV: 'production'}})
    expect(stdout).toContain('🐛')
    expect(stdout).not.toContain('🎨')
  })
})
