/*! understanding_module.js © yamoo9.net, 2016 */
// 모듈 흉내
// 프론트엔드 환경에서는 IIFE 패턴(즉시 실행함수)을 사용
// 모듈 패턴
var buttle = '버틀';

(function(global){
  // 엄격한 자바스크립트 (모드 변경: change strict mode)
  'use strict';
  // 비공개
  var buttle = 'latte';
  console.log('in module:', buttle); // 'latte'
  // 공개
  global.cup = 'coffee';

}(window));

// console.log('out:', cup); // 'coffee';
// console.log('out:', buttle); // is not defined