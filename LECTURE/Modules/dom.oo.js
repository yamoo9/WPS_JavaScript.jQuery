/*! dom.oo.js © yamoo9.net, 2016 */
// TAG RegExp: /^\s*<(\w+|!)[^>]*>/
var dom = (function(global){
  // 'use strict';

  // Constructor [Function]
  function dom( selector ) {
    // new를 강제화시키는 패턴
    if ( this.constructor !== dom ) {
      return new dom(selector);
    }
    var _this = this;
    // 순환 (수집, 콜렉션)
    var els = document.querySelectorAll(selector);
    for ( var i=0, l=els.length; i<l; i++ ) {
      this[i] = els[i];
    }
    this.length = l;
  }

  // static methods
  dom.makeArray = function(data) {
    return Array.prototype.slice.call(data, 0);
  };
  dom.each = function(data, callback) {
    for ( var i=0, l=data.length; i<l; i++ ) {
      callback.call(data[i], i, data[i]);
    }
  };

  // Instance [Object]
  // var divs = dom('div');
  // dom.each(divs, function(index, div){
  //   console.log(index, div);
  // });

  // Prototype   [Object]
  // instance methods
  dom.prototype.css = function(){};
  dom.prototype.addClass = function(name){
    for ( var i=0, l=this.length; i<l; i++) {
      this[i].classList.add(name);
    }
  };
  dom.prototype.hasClass = function(){};
  dom.prototype.removeClass = function(){};
  dom.prototype.toggleClass = function(){};

  return dom;

})(this);
