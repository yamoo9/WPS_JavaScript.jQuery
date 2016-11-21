/*! dom.js © yamoo9.net, 2016 */
// 문서객체모델 API를 효율적으로 재사용하기 위한 헬퍼 모듈
(function(global, dom){
  'use strict';

  // 모듈 정의
  var _dom = {
    'version': '0.0.1'
  };

  // 모듈 노출
  // global.dom = _dom;
  dom.version = _dom.version;

})(this, (this.dom = this.dom || {}) );