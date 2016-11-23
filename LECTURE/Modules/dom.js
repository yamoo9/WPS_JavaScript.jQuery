/*! dom.js © yamoo9.net, 2016 */
// 문서객체모델 API를 효율적으로 재사용하기 위한 헬퍼 모듈
var dom = (function(global){
  'use strict';

  // 참조
  var keys     = Object.keys;
  var toString = Object.prototype.toString;

  // --------------------------------------------------------------
  // 인스턴스 메소드
  var hasClass, addClass, removeClass, toggleClass, radioClass;

  // hasClass = (el_node, check_class_name) => {
  //   if ( 'classList' in Element.prototype ) {
  //     return el_node.classList.contains(check_class_name);
  //   } else {
  //     let reg = new RegExp(`(^|\\s+)${check_class_name}($|\\s+)`);
  //     let current_class = el_node.getAttribute('class');
  //     return reg.test(current_class);
  //   }
  // };

  if ( 'classList' in Element.prototype ) {
    hasClass = (el_node, check_class_name) => {
      return el_node.classList.contains(check_class_name);
    };
  } else {
    hasClass = (el_node, check_class_name) => {
      let reg = new RegExp(`(^|\\s+)${check_class_name}($|\\s+)`);
      let current_class = el_node.getAttribute('class');
      return reg.test(current_class);
    };
  }

  addClass = (el_node, add_class_name) => {
    el_node.classList.add(add_class_name);
    // if ( !hasClass(el_node, add_class_name) ) {
    //   let current_class = el_node.getAttribute('class') || '';
    //   el_node.setAttribute('class', trim(`${current_class} ${add_class_name}`));
    // }
  };

  removeClass = (el_node, remove_class_name) => {
    el_node.classList.remove(remove_class_name);
    // if ( !remove_class_name ) { el_node.setAttribute('class', ''); }
    // if ( hasClass(el_node, remove_class_name) ) {
    //   var reg = new RegExp(`(^|\\s+)${remove_class_name}($|\\s+)`);
    //   var changed_class = el_node.getAttribute('class').replace(reg, '');
    //   el_node.setAttribute('class', changed_class);
    // }
  };

  toggleClass = (el_node, toggle_class_name) => {
    el_node.classList.toggle(toggle_class_name);
    // hasClass(el_node, toggle_class_name) ?
    //   removeClass(el_node, toggle_class_name) :
    //   addClass(el_node, toggle_class_name);
  };

  // --------------------------------------------------------------
  // style 제어

  var getStyle, setStyle, css;
  // [W3C Standard] IE 9+, Modern Web Browsers
  if ( global.getComputedStyle ) {
    getStyle = function(el_node, prop_name) {
      return global.getComputedStyle(el_node,null)[prop_name];
    };
  }
  // [Only MS IE] IE 8-
  else {
    getStyle = function(el_node, prop_name) {
      return el_node.currentStyle[prop_name];
    };
  }

  function setStyle(el_node, prop_name, value) {
    el_node.style[prop_name] = value;
  }

  function css( el_node, prop_name, value ) {
    if ( !value ) {
      return getStyle(el_node, prop_name);
    } else {
      setStyle(el_node, prop_name, value);
    }
  }

  // --------------------------------------------------------------
  // 유틸리티 메소드
  var trimLeft = function(str){
    return str.replace(/^\s+/,'');
  };
  var trimRight = function(str){
    return str.replace(/\s+$/,'');
  };
  var trim = function(str) {
    return trimLeft(trimRight(str));
  };
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
    'version'       : '0.0.1',
    'type'          : type,
    'isNumber'      : isNumber,
    'isString'      : isString,
    'isBoolean'     : isBoolean,
    'isFunction'    : isFunction,
    'isArray'       : isArray,
    'isObject'      : isObject,
    'isEmptyObject' : isEmptyObject,
    'validate'      : validate,
    'trim'          : trim,
    // 'trimLeft'      : trimLeft,
    // 'trimRight'     : trimRight,
    'hasClass'      : hasClass,
    'addClass'      : addClass,
    'removeClass'   : removeClass,
    'toggleClass'   : toggleClass,
    'css'           : css,
  };

})(this);

// // ES6 (2015)
// {
//   let addClass = function(){};
//   let dom = {'addClass': addClass};
//   window.dom = dom;
// }
