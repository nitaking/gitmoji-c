import {type Gitmoji, gitmojis} from './utils.js'

interface AutoCompleteChoice {
  name: string
  value: string
}

const toChoices = (list: Gitmoji[]): AutoCompleteChoice[] =>
  list.map((g) => ({
    name: `${g.emoji}  - ${g.description}`,
    value: g.emoji,
  }))

export interface QuestionConfig {
  name: string
  message: string
  type?: string
  source?: (answers: unknown, input: string) => Promise<AutoCompleteChoice[]>
}

export const questions: QuestionConfig[] = [
  {
    name: 'gitmoji',
    message: 'Choose a gitmoji:',
    type: 'autocomplete',
    async source(_: unknown, input: string) {
      const emojiList = await gitmojis()
      const filtered = emojiList.filter((g: Gitmoji) => {
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
