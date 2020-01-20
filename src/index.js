import { getOptions } from 'loader-utils'
import commonmark from 'commonmark'

const defaultOptions = {}

// 读取并渲染 markdown 文件
export function renderMarkdown (source) {
  const fileContent = JSON.parse(JSON.stringify(source))
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()
  return writer.render(reader.parse(fileContent.trim()))
}

export function processHtml (html) {
  const codeReg = new RegExp('<code class=([\\s\\S]*)>([\\s\\S]*)</code>')
  const code = codeReg.exec(html)
  let newHtml = html
  if (code) {
    newHtml = newHtml.replace(code[2], '{`' + code[2] + '`}').replace(/&gt;/g, '>').replace(/&lt;/g, '<')
  }
  console.log(newHtml)
  return newHtml
}

function loader (source) {
  this.cacheable && this.cacheable()
  const options = Object.assign(defaultOptions, getOptions(this))
  let result = null
  const callback = this.async()
  if (options.use_raw) {
    result = `
      const raw_content = '${source}'
      export default raw_content
    `
  } else {
    const html = renderMarkdown(source).trim()
    result = `
      import React, { Fragment } from 'react'
      const Component = () => (
        <Fragment>${processHtml(html)}</Fragment>
      )
      export default {
        html: '${html.replace(/\n/g, '')}',
        Component
      }
    `
  }
  callback(null, result)
}

export default loader
