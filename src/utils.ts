import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs'
import {homedir} from 'node:os'
import {join} from 'node:path'

/** Represents a single gitmoji entry with its emoji, code, and metadata. */
export interface Gitmoji {
  emoji: string
  entity: string
  code: string
  description: string
  name: string
}

const CACHE_DIR = join(homedir(), '.gitmoji')
const CACHE_FILE = join(CACHE_DIR, 'gitmojis.json')
const REMOTE_URL = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json'

/** Fetches the latest gitmoji list from the remote repository. */
export const fetchRemoteGitmojis = async (): Promise<Gitmoji[]> => {
  const res = await fetch(REMOTE_URL, {signal: AbortSignal.timeout(5000)})
  if (!res.ok) throw new Error(`Failed to fetch gitmojis: ${res.status}`)
  const data: {gitmojis: Gitmoji[]} = await res.json()
  return data.gitmojis
}

/** Saves gitmoji data to the local cache file (~/.gitmoji/gitmojis.json). */
export const saveCache = (data: Gitmoji[]): void => {
  mkdirSync(CACHE_DIR, {recursive: true})
  writeFileSync(CACHE_FILE, JSON.stringify({gitmojis: data}, null, 2))
}

const loadCache = (): Gitmoji[] | null => {
  if (!existsSync(CACHE_FILE)) return null
  const raw = readFileSync(CACHE_FILE, 'utf-8')
  return JSON.parse(raw).gitmojis as Gitmoji[]
}

/** Returns the gitmoji list, using local cache if available, otherwise fetching from remote. */
export const gitmojis = async (): Promise<Gitmoji[]> => {
  const cached = loadCache()
  if (cached) return cached

  const data = await fetchRemoteGitmojis()
  saveCache(data)
  return data
}
