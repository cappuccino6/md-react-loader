import { getOptions } from 'loader-utils'

module.exports = function (source) {
  const options = getOptions(this) || {}
  return 123
}
