/*! shuffle-album.js © yamoo9.net, 2016 */
(function(global){
  'use strict';

  // Audio 객체 생성
  // var bgm = document.createElement('audio');
  var bgm = new Audio();
  bgm.setAttribute('src', './media/Warm Vibes.mp3');

  var playMusic = function() {
    bgm.play();
  };
  var stopMusic = function() {
    bgm.pause();
    bgm.currentTime = 0;
  };

  var doc = global.document;
  // .shuffle-container 변수에 참조
  var container = doc.querySelector('.shuffle-container');
  // .shuffle-album-cover 변수에 참조
  var cover = container.querySelector('.shuffle-album-cover');
  // .shuffle-album-disk 변수에 참조
  var disk = container.querySelector('.shuffle-album-disk');

  // console.log('container:', container);
  // console.log('cover:', cover);
  // console.log('disk:', disk);

  /** @function playDisk() */
  var playDisk = function (e) {
    // disk 문서 객체의 class 속성을 제어한다.
    // disk 객체의 속성 값을 가져온다.
    // var current_class_attr = disk.getAttribute('class');
    // var check_class_name = new RegExp('(^|\\s+)'+ 'animate' +'($|\\s+)');
    // if ( !check_class_name.test(current_class_attr) ) {
    //   disk.setAttribute('class', current_class_attr + ' ' + 'animate');
    // }
    // 기능을 분리하여 로직을 만든 후 처리하는 코드는 아래와 같다.
    addClass(disk, 'animate');
    playMusic();
  };
  var stopDisk = function(e) {
    removeClass(disk, 'animate');
    stopMusic();
  };

  // 사용자가 cover 참조 객체를 클릭하면
  cover.addEventListener('click', playDisk, false);

})(this);