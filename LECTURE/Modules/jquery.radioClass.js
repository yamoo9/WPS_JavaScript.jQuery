/*! jquery.radioClass.js © yamoo9.net, 2016 */
(function(global, $){
  'use strict';
  if (!$.fn.radioClass) {
    $.fn.radioClass = function(class_name) {
      // this // jQuery Instance Object
      // console.log('in fn:', this);
      var $collection = this;
      return this.each(function(index) {
        // this // DOM Element
        var $this = $collection.eq(index);
        $this.siblings('.'+class_name).removeClass(class_name);
        $this.addClass(class_name);
      });
    };
  }
})(this, jQuery);
