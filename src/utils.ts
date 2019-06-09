import axios from 'axios'

const base = axios.create({
  baseURL: 'https://raw.githubusercontent.com/carloscuesta/gitmoji/master',
  timeout: 5000,
  headers: {},
  params: {}
})

export const gitmojis = async () => {
  const res = await base.get('/src/data/gitmojis.json')

  return res.data.gitmojis
}
