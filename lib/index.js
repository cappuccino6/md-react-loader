'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source) {
  this.cacheable && this.cacheable();
  var options = Object.assign(defaultOptions, (0, _loaderUtils.getOptions)(this));
  var callback = this.async();
  callback(null, 'export default ' + renderMarkdown(source));
};

var _loaderUtils = require('loader-utils');

var _commonmark = require('commonmark');

var _commonmark2 = _interopRequireDefault(_commonmark);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultOptions = {};

// 读取并渲染 markdown 文件
var renderMarkdown = function renderMarkdown(source) {
  var fileContent = JSON.parse(JSON.stringify(source));
  var reader = new _commonmark2.default.Parser();
  var writer = new _commonmark2.default.HtmlRenderer();
  return writer.render(reader.parse(fileContent));
};