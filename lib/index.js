'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (source) {
  this.cacheable && this.cacheable();
  var options = Object.assign(defaultOptions, (0, _loaderUtils.getOptions)(this));
  var callback = this.async();
  callback(null, '123');
};

var _loaderUtils = require('loader-utils');

var defaultOptions = {};