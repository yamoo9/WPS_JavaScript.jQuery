/*! validate.js © yamoo9.net, 2016 */
(function(global, dom){
  'use strict';

  function isNumber(n) {
    return typeof n === 'number';
  }

  dom.utils = dom.utils || {};
  dom.utils.isNumber = isNumber;

})(this, (this.dom = this.dom || {}));