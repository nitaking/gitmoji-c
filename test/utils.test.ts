import {describe, expect, it, vi, beforeEach, afterEach} from 'vitest'
import {existsSync, mkdirSync, writeFileSync, rmSync} from 'fs'
import {join} from 'path'
import {tmpdir} from 'os'

const TEST_HOME = join(tmpdir(), 'gitmoji-test-home-' + process.pid)
const TEST_CACHE_DIR = join(TEST_HOME, '.gitmoji')
const TEST_CACHE_FILE = join(TEST_CACHE_DIR, 'gitmojis.json')

vi.mock('os', async () => {
  const actual = await vi.importActual<typeof import('os')>('os')
  return {...actual, homedir: () => TEST_HOME}
})

describe('utils', () => {
  beforeEach(() => {
    mkdirSync(TEST_CACHE_DIR, {recursive: true})
  })

  afterEach(() => {
    rmSync(TEST_HOME, {recursive: true, force: true})
    vi.resetModules()
  })

  it('should load from cache when available', async () => {
    const fixture = {gitmojis: [{emoji: '🎨', description: 'test', name: 'art', code: ':art:'}]}
    writeFileSync(TEST_CACHE_FILE, JSON.stringify(fixture))

    const {gitmojis} = await import('../src/utils.js')
    const list = await gitmojis()
    expect(list).toHaveLength(1)
    expect(list[0].emoji).toBe('🎨')
  })

  it('should fetch remotely and cache when no cache exists', async () => {
    if (existsSync(TEST_CACHE_FILE)) rmSync(TEST_CACHE_FILE)

    const {gitmojis} = await import('../src/utils.js')
    const list = await gitmojis()
    expect(Array.isArray(list)).toBe(true)
    expect(list.length).toBeGreaterThan(0)
    expect(existsSync(TEST_CACHE_FILE)).toBe(true)
  })
})
