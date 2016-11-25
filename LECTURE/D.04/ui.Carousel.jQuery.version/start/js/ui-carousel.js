/*! ui-carousel.js © yamoo9.net, 2016 */

// --------------------------------------------------------------------------------------------
// TODO:
//
// 0. 캐러셀 탭 패널을 감싼 `래퍼 요소의 너비`를 `탭 패널 너비 × 탭 패널 개수`로 설정한다.
// 1. 인디케이터 탭 버튼을 누르면 캐러셀 콘텐츠는 해당 콘텐츠를 보여준다.
// 2. 이전/다음 탐색 버튼을 누르면 캐러셀 콘텐츠는 슬라이드 되어 콘텐츠를 보여준다. (인디케이터 탭 업데이트)
// 3. 3초마다 자동으로 다음 콘텐츠를 보여줄 수 있도록 설정한다.
// 4. 마우스가 캐러셀 영역으로 들어가면 자동 넘김이 멈추고, 마우스가 캐러셀 영역 밖으로 나가면 자동 넘김이 다시 시작한다.
// 5. 인디케이터 탭 또는 이전/다음 탐색 버튼에 포커스가 되면 자동 넘김이 멈춰야 한다.
// 6. 자동 넘김 또는 넘김 시간 등은 옵션으로 설정할 수 있도록 변경한다.
// 7. 객체 지향 자바스크립트 방식으로 코드를 변경한다. (e.g: new Carousel('#bs3-headphone') )
// --------------------------------------------------------------------------------------------
(function(global, $){
  'use strict';
  // 모듈 내부에서 참조 가능한 별칭(Alias) 변수
  var doc = global.document;
  // jQuery(document).ready 함수 실행
  // 문서객체모델이 완료된 시점에서 코드가 실행된다.
  $(doc).ready( init );
  // 모듈 내부 영역 어디에서든 참조 가능하도록 변수 설정
  var $tab_panels, $tab_list, $tabs, $widget, $tab_wrapper, $global = $(global);
  /** @function 애플리케이션 컴포넌트 초기화 */
  function init() {
    // 위젯 컴포넌트의 하위 객체를 관리
    settingReferenceObjects();
    // 탭패널 래퍼 객체의 너비 설정
    settingWrapperWidth();
    // 위젯 이벤트 관리
    bindEvents();
    // 페이지가 로드가 되면 resizeCarouselSize 함수 실행 UI 완성
    resizeCarouselSize();
  }
  /** @function 컴포넌트 하위 객체를 참조하는 함수 */
  function settingReferenceObjects() {
    $widget      = $('.ui-carousel');
    $tab_list    = $('.ui-carousel-tablist', $widget);
    $tabs        = $tab_list.find('a');
    $tab_wrapper = $widget.find('.ui-carousel-tabpanel-wrapper');
    $tab_panels  = $tab_wrapper.children();
  }
  function settingWrapperWidth() {
    $.each($tab_panels, function(index) {
      var $tab_panel = $tab_panels.eq(index);
      $tab_panel.width( $widget.width() );
    });
    var wrapper_width = $tab_panels.eq(0).width() * $tab_panels.length;
    $tab_wrapper.width(wrapper_width);
  }
  function bindEvents() {
    // 사용자가 웹 브라우저 창 크기를 조정하면 이벤트 발생, 핸들러인 함수 실행
    $global.on('resize', resizeCarouselSize);
  }
  /** @function 웹 브라우저 창 크기 조정에 따른 높이를 변경해주는 함수 */
  function resizeCarouselSize() {
    // 래퍼 객체 내부의 아이템 하나의 높이를 가져왔다.
    // $tab_wrapper.children().height()
    $widget.height( $tab_wrapper.children().height() );
  }

})(window, window.jQuery);
