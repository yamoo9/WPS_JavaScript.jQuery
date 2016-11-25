/*! aniControl.js © yamoo9.net, 2016 */
(function(global){
  'use strict';

  global.aniControl = {
    'play': function(callback, time){
      return global.setInterval(callback, time);
    },
    'stop': function(stop_id){
      global.clearInterval(stop_id);
    }
  };

})(this);
