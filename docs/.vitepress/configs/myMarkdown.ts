import fs from 'node:fs'
import path from 'node:path'
import MarkdownIt from 'markdown-it'
import mdContainer from 'markdown-it-container'
import type Token from 'markdown-it/lib/token'
import { highlight } from '../utils/highlight'

const localMd = MarkdownIt()

// eslint-disable-next-line regexp/no-super-linear-backtracking
const demoRex = /^demo\s*(.*)$/

export function markdownPlugin(md: MarkdownIt) {
  md.use(mdContainer, 'demo', {
    validate(params: string) {
      return !!params.trim().match(demoRex)
    },

    render(tokens: Token[], idx: number) {
      const m = tokens[idx].info.trim().match(demoRex)
      const sourceFileToken = tokens[idx + 2]

      if (tokens[idx].nesting === 1) {
        const description = m && m.length > 1 ? m[1] : ''
        const sourceFilePath = sourceFileToken?.children?.[0].content ?? ''

        let code = ''

        if (sourceFileToken?.type === 'inline') {
          code = fs.readFileSync(
            path.resolve(__dirname, '../../demos', sourceFilePath, 'index.vue'),
            'utf-8',
          )
        }

        code = highlight(code)

        return `<Demo
:demos="demos"
desc="${encodeURIComponent(localMd.render(description))}"
path="${sourceFilePath}"
source="${encodeURIComponent(code)}"
>`
      }
      else {
        return '</Demo>'
      }
    },
  })
}
