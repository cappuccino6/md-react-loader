'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loaderUtils = require('loader-utils');

var _commonmark = require('commonmark');

var _commonmark2 = _interopRequireDefault(_commonmark);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

/** read and parser
 * @param {String} sourse
 */
function loader(source) {
  this.cacheable && this.cacheable();
  var callback = this.async();
  var options = Object.assign(defaultOptions, (0, _loaderUtils.getOptions)(this));
  var result = null;
  if (options.use_raw) {
    result = '\n      const raw_content = \'' + source + '\'\n      export default raw_content\n    ';
  } else {
    var html = (0, _utils.parser)(source).trim();
    result = '\n      import React, { Fragment } from \'react\'\n      const Component = props => (\n        <div {...props}>' + (0, _utils.processHtml)(html) + '</div>\n      )\n      export default {\n        html: \'' + html.replace(/\n/g, '') + '\',\n        Component\n      }\n    ';
  }
  callback(null, result);
}

exports.default = loader;