/*! dom.js © yamoo9.net, 2016 */
// 문서객체모델 API를 효율적으로 재사용하기 위한 헬퍼 모듈
(function(global, dom){
  'use strict';

  var toString = Object.prototype.toString;

  /**
   * --------------------------------
   * 유틸리티 메소드
   * ----------------------------- */
  function type(data) {
    return toString.call(data).toLowerCase().slice(8,-1);
  }
  function isNumber(data) {
    return type(data) === 'number';
  }
  function isString(data) {
    return type(data) === 'string';
  }
  function isBoolean(data) {
    return type(data) === 'boolean';
  }
  function isFunction(data) {
    return type(data) === 'function';
  }
  function isArray(data) {
    return type(data) === 'array';
  }
  function isObject(data) {
    // 속성이 있는 객체
    return type(data) === 'object';
  }

  // function isEmptyObject(data) {
  //   // 데이터 유효성 검증
  //   validate( !isObject(data), '전달인자는 객체 유형이어야 합니다.' );
  //   // 조건 1. 사용자의 브라우저가 Object.keys 지원한다면?
  //   if ( Object.keys ) {
  //     return Object.keys(data).length === 0;
  //   }
  //   // 조건 2. 사용자의 브라우저가 Object.keys 지원하지 않는다면?
  //   else {
  //     var props = [];
  //     for ( var prop in data) {
  //       // 프로토타입 체인
  //       // 자신의 속성이 아닌, 상위 프로토타입 객체의 속성도 거슬러 참조
  //       if ( data.hasOwnProperty(prop) ) {
  //         props.push(prop);
  //       }
  //     }
  //     return props.length === 0;
  //   }
  // }

  // [리팩토링] 로드를 수행한 후에는 하나의 함수만 정의하는 방법
  var isEmptyObject = (function(){
    var _isEmptyObject; // undefined
    if ( Object.keys ) {
      _isEmptyObject = function(data) {
        return Object.keys(data).length === 0;
      };
    } else {
      _isEmptyObject = function(data) {
        var props = [];
        for ( var prop in data) {
          if ( data.hasOwnProperty(prop) ) {
            props.push(prop);
          }
        }
        return props.length === 0;
      };
    }
    return _isEmptyObject;
  })();

  function validate(condition, err_message) {
    if (condition) {
      throw new Error(err_message);
    }
  }

  // 모듈 정의
  var _dom = {
    'version': '0.0.1'
  };

  // 모듈 노출
  // global.dom = _dom;
  dom.version = _dom.version;

})(this, (dom = dom || {}) );