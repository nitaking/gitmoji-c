import {gitmojis} from './utils'

interface IGitmoji {
  emoji: string
  description: string
  name: string
}
interface IAutoCompletePromptValue {
  name: string
  value: string
}
interface IAnswer {
  gitmoji: string
  title: string
  message: string
}

const displayValue = (gitmojis: IGitmoji[]): IAutoCompletePromptValue[] => {
  return gitmojis.map((gitmoji: IGitmoji) => ({
    name: `${gitmoji.emoji}  - ${gitmoji.description}`,
    value: gitmoji['emoji' || 'code']
  }))
}

class Prompt {
  public get questions() {
    return [
      {
        name: 'gitmoji',
        message: 'Choose a gitmoji:',
        type: 'autocomplete',
        async source(_: any, input: { toLowerCase(): void; }) {
          const emojiList = await gitmojis()
          const searchResult = emojiList.filter((gitmoji: IGitmoji) => {
            const emoji = gitmoji.name.concat(gitmoji.description).toLowerCase()
            // @ts-ignore
            return (!input || emoji.indexOf(input.toLowerCase()) !== -1)
          })

          return displayValue(searchResult)
        }
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
  }
}

const instance = new Prompt()
export const questions = instance.questions
