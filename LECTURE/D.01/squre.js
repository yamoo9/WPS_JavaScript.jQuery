/*! square.js © yamoo9.net, 2016 */
(function(global, dom){
  'use strict';

  var utils = dom.utils;

  global.square = function(n) {
    utils.validate(!utils.isNumber(n), '전달인자는 숫자여야 함.');
    return n * n;
  };

})(this, this.dom);