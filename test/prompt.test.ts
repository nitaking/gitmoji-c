import {describe, expect, it} from 'vitest'
import {questions} from '../src/prompt'

describe('prompt', () => {
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
    expect(results.length).toBeGreaterThan(0)
    expect(results.some((r: any) => r.name.includes('bug') || r.name.includes('🐛'))).toBe(true)
  })

  it('should return all gitmojis when input is empty', async () => {
    const source = questions[0].source as (answers: any, input: string) => Promise<any[]>
    const results = await source(null, '')
    expect(results.length).toBeGreaterThan(10)
  })
})
