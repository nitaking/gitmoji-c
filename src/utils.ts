import axios from 'axios'

const base = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
})

export const gitmojis = async () => {
  const res = await base.get('/packages/gitmojis/src/gitmojis.json')
  return res.data.gitmojis
}
