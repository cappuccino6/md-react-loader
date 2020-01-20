'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.renderMarkdown = renderMarkdown;
exports.processHtml = processHtml;

var _loaderUtils = require('loader-utils');

var _commonmark = require('commonmark');

var _commonmark2 = _interopRequireDefault(_commonmark);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

// 读取并渲染 markdown 文件
function renderMarkdown(source) {
  var fileContent = JSON.parse(JSON.stringify(source));
  var reader = new _commonmark2.default.Parser();
  var writer = new _commonmark2.default.HtmlRenderer();
  return writer.render(reader.parse(fileContent.trim()));
}

function processHtml(html) {
  var codeReg = new RegExp('<code class=([\\s\\S]*)>([\\s\\S]*)</code>');
  var code = codeReg.exec(html);
  var newHtml = html;
  if (code) {
    newHtml = newHtml.replace(code[2], '{`' + code[2] + '`}').replace(/&gt;/g, '>').replace(/&lt;/g, '<');
  }
  console.log(newHtml);
  return newHtml;
}

function loader(source) {
  this.cacheable && this.cacheable();
  var options = Object.assign(defaultOptions, (0, _loaderUtils.getOptions)(this));
  var callback = this.async();
  if (options.use_raw) {
    callback(null, source);
  }
  var html = renderMarkdown(source).trim();
  var result = '\n    import React, { Fragment } from \'react\'\n    const Component = () => (\n      <Fragment>' + processHtml(html) + '</Fragment>\n    )\n    export default {\n      html: \'' + html.replace(/\n/g, '') + '\',\n      Component\n    }\n  ';
  callback(null, result);
}

exports.default = loader;