import {describe, expect, it} from 'vitest'
import {gitmojis} from '../src/utils'

describe('utils', () => {
  describe('gitmojis', () => {
    it('should fetch gitmoji list from remote', async () => {
      const list = await gitmojis()
      expect(Array.isArray(list)).toBe(true)
      expect(list.length).toBeGreaterThan(0)
    })

    it('should return gitmojis with expected shape', async () => {
      const list = await gitmojis()
      const first = list[0]
      expect(first).toHaveProperty('emoji')
      expect(first).toHaveProperty('description')
      expect(first).toHaveProperty('name')
    })
  })
})
