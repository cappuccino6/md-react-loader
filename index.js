import { getOptions } from 'loader-utils'
import commonmark from 'commonmark'
import fs from 'fs'

const defaultOptions = {}

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
  const html = renderMarkdown(source).trim().replace('\n', '')

  const result = `
    import React from 'react'
    const Component = <React.Fragment>${html}</React.Fragment>
    export default {
      Component,
      size: '${html.length}'
    }
  `
  callback(null, result)
}

export default loader