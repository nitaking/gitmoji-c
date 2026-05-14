import axios from 'axios'
import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'fs'
import {homedir} from 'os'
import {join} from 'path'

const CACHE_DIR = join(homedir(), '.gitmoji')
const CACHE_FILE = join(CACHE_DIR, 'gitmojis.json')
const REMOTE_URL = 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json'

export const fetchRemoteGitmojis = async () => {
  const res = await axios.get(REMOTE_URL, {timeout: 5000})
  return res.data.gitmojis
}

export const saveCache = (data: any[]) => {
  mkdirSync(CACHE_DIR, {recursive: true})
  writeFileSync(CACHE_FILE, JSON.stringify({gitmojis: data}, null, 2))
}

const loadCache = (): any[] | null => {
  if (!existsSync(CACHE_FILE)) return null
  const raw = readFileSync(CACHE_FILE, 'utf-8')
  return JSON.parse(raw).gitmojis
}

export const gitmojis = async () => {
  const cached = loadCache()
  if (cached) return cached

  const data = await fetchRemoteGitmojis()
  saveCache(data)
  return data
}
