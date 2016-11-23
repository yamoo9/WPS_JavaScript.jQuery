/*! jquery.cache.js © yamoo9.net, 2016 */
// jQuery 유틸리티 플러그인 (클래스 메소드, 스태틱 메소드)
(function(global, $){
  'use strict';

  if ( !$.cache ) {
    $.cache = function( dom_el, key ){
      var $this = $.data(dom_el, key);
      return $this ? $this : $.data(dom_el, key, $(dom_el));
    };
    $.$ = $.cache;
  }

})(this, this.jQuery);
