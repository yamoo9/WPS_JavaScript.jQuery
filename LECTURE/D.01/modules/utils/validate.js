/*! validate.js © yamoo9.net, 2016 */
(function(global, dom){
  'use strict';

  function validate(condition, err_message) {
    if (condition) {
      throw new Error(err_message);
    }
  }

  dom.utils = dom.utils || {};
  dom.utils.validate = validate;

})(this, (this.dom = this.dom || {}));