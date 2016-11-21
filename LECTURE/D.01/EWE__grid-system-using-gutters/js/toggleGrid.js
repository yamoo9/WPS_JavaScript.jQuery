(function(global){
  'use strict';
  var body = document.querySelector('body');
  global.addEventListener('keypress', function(e) {
    if ( e.keyCode === 71 && e.shiftKey ) {
      body.classList.toggle('show-grid');
    }
    if ( e.ctrlKey ) {
      body.classList.toggle('overlay');
    }
  });
})(this);
