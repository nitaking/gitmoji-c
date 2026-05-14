import {describe, expect, it, vi, beforeAll} from 'vitest'
import {readFileSync} from 'fs'
import {resolve, dirname} from 'path'
import {fileURLToPath} from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fixture = JSON.parse(readFileSync(resolve(__dirname, 'fixtures/gitmojis.json'), 'utf-8'))

vi.mock('../src/utils.js', () => ({
  gitmojis: vi.fn().mockResolvedValue(fixture.gitmojis),
}))

describe('prompt', () => {
  let questions: any[]

  beforeAll(async () => {
    const mod = await import('../src/prompt.js')
    questions = mod.questions
  })

  it('should define 3 questions', () => {
    expect(questions).toHaveLength(3)
  })

  it('should have gitmoji autocomplete question', () => {
    const gitmoji = questions[0]
    expect(gitmoji.name).toBe('gitmoji')
    expect(gitmoji.type).toBe('autocomplete')
    expect(gitmoji.source).toBeTypeOf('function')
  })

  it('should filter gitmojis by input', async () => {
    const source = questions[0].source as (answers: any, input: string) => Promise<any[]>
    const results = await source(null, 'bug')
    expect(results.length).toBe(1)
    expect(results[0].name).toContain('🐛')
  })

  it('should return all gitmojis when input is empty', async () => {
    const source = questions[0].source as (answers: any, input: string) => Promise<any[]>
    const results = await source(null, '')
    expect(results).toHaveLength(5)
  })
})
