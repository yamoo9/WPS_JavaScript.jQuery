/*! string.repeat.js © yamoo9.net, 2016 */
'use strict';

function repeat(str, count) {
  var _arr = [];
  while ( _arr.length < count ) {
    _arr.push(str);
  }
  return _arr.join('');
}

// 모듈 공개
module.exports = repeat;
