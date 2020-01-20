import { getOptions } from 'loader-utils'
import { parser, processHtml } from './utils'

const defaultOptions = {}

/** read and parser
 * @param {String} sourse
 */
function loader (source) {
  this.cacheable && this.cacheable()
  const callback = this.async()
  const options = Object.assign(defaultOptions, getOptions(this))
  let result = null
  if (options.use_raw) {
    result = `
      const raw_content = '${source}'
      export default raw_content
    `
  } else {
    const html = parser(source).trim()
    result = `
      import React from 'react'
      const Component = props => (
        <div {...props}>${processHtml(html)}</div>
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
