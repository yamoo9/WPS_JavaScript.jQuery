/*! controll.js © yamoo9.net, 2016 */
(function(){
  'use strict';

  var print_square_button = document.querySelector('.print-square-button');
  var print_square_area   = document.querySelector('.print-square-area');

  var clickPrintSquare = function (){
    var n = this.getAttribute('data-square-value');
    n = Number(n);
    print_square_area.textContent = square(n);
    this.setAttribute('data-square-value',  ++n);
  };

  print_square_button.onclick = clickPrintSquare;

}());