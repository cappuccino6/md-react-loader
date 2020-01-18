import { getOptions } from 'loader-utils'
import commonmark from 'commonmark'
import fs from 'fs'

const defaultOptions = {}

// 读取并渲染 markdown 文件
const renderMarkdown = function (source) {
  const fileContent = JSON.parse(JSON.stringify(source))
  const reader = new commonmark.Parser()
  const writer = new commonmark.HtmlRenderer()
  return writer.render(reader.parse(fileContent))
}

export default function (source) {
  this.cacheable && this.cacheable()
  const options = Object.assign(defaultOptions, getOptions(this))
  let callback = this.async()
  const a = renderMarkdown(source)
  callback(null, `export default '${a.trim()}'`)
}
