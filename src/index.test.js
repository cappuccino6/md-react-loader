import test from 'ava'
import { processHtml } from './index'

const html = `
  <h1>这是标题</h1>
  <h2>这是副标题</h2>
  <pre><code class="language-js">const func = () => {
    const a = 3
    return a
  }</code></pre>`

const newHtml = `
  <h1>这是标题</h1>
  <h2>这是副标题</h2>
  <pre><code class="language-js">const func = () =>` + '{` {' + `
    const a = 3
    return a
  ` + '}`}</code></pre>'

test('processHtml testing', t => {
  t.is(processHtml(html), newHtml)
})
