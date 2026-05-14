import {gitmojis} from './utils.js'

interface IGitmoji {
  emoji: string
  description: string
  name: string
}

interface IAutoCompleteChoice {
  name: string
  value: string
}

const toChoices = (list: IGitmoji[]): IAutoCompleteChoice[] =>
  list.map((g) => ({
    name: `${g.emoji}  - ${g.description}`,
    value: g.emoji,
  }))

export const questions = [
  {
    name: 'gitmoji',
    message: 'Choose a gitmoji:',
    type: 'autocomplete',
    async source(_: any, input: string) {
      const emojiList = await gitmojis()
      const filtered = emojiList.filter((g: IGitmoji) => {
        const text = g.name.concat(g.description).toLowerCase()
        return !input || text.includes(input.toLowerCase())
      })
      return toChoices(filtered)
    },
  },
  {
    name: 'title',
    message: 'Enter the commit title',
  },
  {
    name: 'message',
    message: 'Enter the commit message:',
  },
]
