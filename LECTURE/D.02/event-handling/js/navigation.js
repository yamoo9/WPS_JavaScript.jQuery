/*! navigation.js © yamoo9.net, 2016 */
let test = 'global test';
{
  let test = 'local test';
  console.log('in block:', test);
}
console.log('out block:', test);

(function(global){
  'use strict';

  // 문서 객체 nav.gnb 요소에 접근하여 대상을 변수에 참조
  var gnb = document.querySelector('.gnb');
  // 수집한 문서 객체를 브라우저 콘솔 화면에 출력
  // 노드(요소, ElementNode)
  // console.log('gnb:', gnb);

  var gnb_links = gnb.querySelectorAll('a');
  // 노드리스트 nodelist: htmlcollection
  // 유사배열 like array object
  // console.log('gnb_links:', gnb_links);
  // 배열처럼 length 속성을 가진다.
  // 즉, 수집된 요소노드를 순환 가능하다.
  console.log('gnb_links.length', gnb_links.length);
  // 각 <a> 요소를 순환하여 click 이벤트 handler 연결

  // <a> 요소를 사용자가 클릭했을 때 처리하는 함수를 감싼 함수(Wrapper Function)
  // var clickExcuteWrapper = function(index) {
  //   // index = 0;
  //   return function() {
  //     console.log(index, this);
  //     // 클릭 <a href>의 요소의 href 속성이 브라우저로 하여금
  //     // 기본 동작 수행(하이퍼링크, 외부링크, 내부링크)
  //     // 기본 동작 차단 (preventDefault)
  //     return false;
  //   };
  // };

  // while, for, forEach 사용
  for ( let gnb_link, i=0, l=gnb_links.length; i<l; i++ ) {
    gnb_link = gnb_links[i]; // <a>
    // gnb_link.onclick = clickExcuteWrapper(i);
    // gnb_link.onclick = (function(index){
    //   return function() {
    //     console.log(index, this);
    //     // 클릭 <a href>의 요소의 href 속성이 브라우저로 하여금
    //     // 기본 동작 수행(하이퍼링크, 외부링크, 내부링크)
    //     // 기본 동작 차단 (preventDefault)
    //     return false;
    //   };
    // })(i);
    // 구형 이벤트 모델
    // gnb_link.onclick = function() {
    //   console.log(i, this);
    //   // 클릭 <a href>의 요소의 href 속성이 브라우저로 하여금
    //   // 기본 동작 수행(하이퍼링크, 외부링크, 내부링크)
    //   // 기본 동작 차단 (preventDefault)
    //   return false;
    // };
    // W3C: 신형 이벤트 모델을 사용한 이벤트 속성에 핸들러 바인딩
    gnb_link.addEventListener('click', function(e) {
      // 브라우저 기본 동작 차단
      e.preventDefault();
      console.log(i, e.target);
    }, false);
    // MS IE: 비 표준
    // gnb_link.attachEvent('onclick', function() {
    //   var event = global.event;
    //   var _this = event.srcElement;
    //   // 브라우저 기본 동작 차단
    //   event.returnValue = false;
    //   console.log(i, _this);
    // });
  }

})(this);