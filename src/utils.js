import commonmark from 'commonmark'

/** read and parser
 * @param {String} sourse
 */
export function parser (source) {
  const fileContent = JSON.parse(JSON.stringify(source))
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()
  return writer.render(reader.parse(fileContent.trim()))
}

/** process raw html
 * @param {String} html
 */
export function processHtml (html) {
  const codeReg = new RegExp('<code class=([\\s\\S]*)>([\\s\\S]*)</code>')
  const code = codeReg.exec(html)
  let newHtml = html
  if (code) {
    newHtml = newHtml.replace(code[2], '{`' + code[2] + '`}').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
  }
  return newHtml
}
