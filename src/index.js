import { getOptions } from 'loader-utils'
import commonmark from 'commonmark'
import fs from 'fs-extra'

const defaultOptions = {}

const codeReg = new RegExp('<code class=([\\s\\S]*)>([\\s\\S]*)</code>')

// 读取并渲染 markdown 文件
function renderMarkdown(source) {
  const fileContent = JSON.parse(JSON.stringify(source))
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()
  return writer.render(reader.parse(fileContent.trim()))
}

function loader (source) {
  this.cacheable && this.cacheable()
  const options = Object.assign(defaultOptions, getOptions(this))
  let callback = this.async()
  let html = renderMarkdown(source).trim()
  let code = codeReg.exec(html)
  if (code) {
    html = html.replace(code[2], '{`' + code[2] + '`}')
  }
  
  const result = `
    import React, { Fragment } from 'react'
    const Component = () => (
      <Fragment>${html}</Fragment>
    )
    export default Component
  `
  callback(null, result)
}

export default loader