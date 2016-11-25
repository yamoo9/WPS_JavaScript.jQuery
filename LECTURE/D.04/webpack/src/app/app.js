/*! app.js © yamoo9.net, 2016 */

// 모듈 로드
// require() 함수
// let path = require('path');
// let custom_path = path.join(__dirname, 'test');

// console.log(custom_path);

// CSS 모듈 로드
// require('!style!css!./css/app.css');
// Sass 모듈 로드
require('!style!css!sass!./sass/style.scss');

// 모듈 로드
// node_modules 디렉토리 내부에서 모듈을 찾아온다.
var jQuery = require('jquery');
require('jquery.easing');

var repeat = require('./string.repeat');
var trim   = require('./string.trim');

// // 모듈 사용
// let result = repeat('yamoo9', 10);

// // DOM Script
// function init() {
//   document.body.innerHTML = `<p>${result}</p>`;
// }
// // 문서 객체가 준비되면 init 실행
// window.addEventListener('DOMContentLoaded', init);


// --------------------------------------------------------------------------------
jQuery(document).ready(init);

function init() {
  var my_p = jQuery('<div>').text( trim(repeat('this is jQuery. ', 4)) );
  jQuery('body').prepend( my_p );
}
