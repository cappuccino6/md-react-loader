'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loaderUtils = require('loader-utils');

var _commonmark = require('commonmark');

var _commonmark2 = _interopRequireDefault(_commonmark);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

var codeReg = new RegExp('<code class=([\\s\\S]*)>([\\s\\S]*)</code>');

// 读取并渲染 markdown 文件
function renderMarkdown(source) {
  var fileContent = JSON.parse(JSON.stringify(source));
  var reader = new _commonmark2.default.Parser();
  var writer = new _commonmark2.default.HtmlRenderer();
  return writer.render(reader.parse(fileContent.trim()));
}

function loader(source) {
  this.cacheable && this.cacheable();
  var options = Object.assign(defaultOptions, (0, _loaderUtils.getOptions)(this));
  var callback = this.async();
  var html = renderMarkdown(source).trim();
  var code = codeReg.exec(html);
  if (code) {
    html = html.replace(code[2], '{`' + code[2] + '`}');
  }

  var result = '\n    import React, { Fragment } from \'react\'\n    const Component = () => (\n      <Fragment>' + html + '</Fragment>\n    )\n    export default Component\n  ';
  callback(null, result);
}

exports.default = loader;