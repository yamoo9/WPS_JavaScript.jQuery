/*! dom.js © yamoo9.net, 2016 */
// 문서객체모델 API를 효율적으로 재사용하기 위한 헬퍼 모듈
var dom = (function(global){
  'use strict';

  // 참조
  var keys     = Object.keys;
  var toString = Object.prototype.toString;

  // --------------------------------------------------------------
  // 유틸리티 메소드
  var type = function (data) {
    return toString.call(data).toLowerCase().slice(8,-1);
  };
  var isNumber = function (data) {
    return type(data) === 'number';
  };
  var isString = function (data) {
    return type(data) === 'string';
  };
  var isBoolean = function (data) {
    return type(data) === 'boolean';
  };
  var isFunction = function (data) {
    return type(data) === 'function';
  };
  var isArray = function (data) {
    return type(data) === 'array';
  };
  var isObject = function (data) {
    return type(data) === 'object';
  };
  var isEmptyObject = (function(){
    var _isEmptyObject; // undefined
    if ( keys ) {
      _isEmptyObject = function(data) {
        return keys(data).length === 0;
      };
    } else {
      _isEmptyObject = function(data) {
        var props = [];
        for ( var prop in data) {
          if ( data.hasOwnProperty(prop) ) { return false; }
        }
        return true;
      };
    }
    return _isEmptyObject;
  })();

  var validate = function (condition, err_message) {
    if (condition) { throw new Error(err_message); }
  };

  // --------------------------------------------------------------
  // 모듈 배포
  return {
    'version'    : '0.0.1',
    'type'       : type,
    'isNumber'   : isNumber,
    'isString'   : isString,
    'isBoolean'  : isBoolean,
    'isFunction' : isFunction,
    'isArray'    : isArray,
    'isObject'   : isObject,
    'validate'   : validate,
  };

})(this);
