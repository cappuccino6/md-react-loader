'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loaderUtils = require('loader-utils');

var _commonmark = require('commonmark');

var _commonmark2 = _interopRequireDefault(_commonmark);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

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
  var html = renderMarkdown(source).trim().replace('\n', '');
  var richText = '<div dangerouslySetInnerHTML={{ __html: ' + html + ' }} />';

  var result = '\n    import React from \'react\'\n    const HtmlComponent = <React.Fragment>' + html + '</React.Fragment>\n    export default {\n      html: \'' + html + '\',\n      component: HtmlComponent\n    }\n  ';
  callback(null, result);
}

exports.default = loader;