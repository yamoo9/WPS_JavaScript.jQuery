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
(function(global, $, $ani){
  'use strict';
  // 모듈 내부에서 참조 가능한 별칭(Alias) 변수
  var doc = global.document;

  // 캐러셀 컴포넌트 옵션
  var using_animation    = true;
  var animation_duration = 800;
  var animation_easing   = 'easeOutElastic';
  var stop_id            = 0;

  // jQuery(document).ready 함수 실행
  // 문서객체모델이 완료된 시점에서 코드가 실행된다.
  $(doc).ready( init );
  // 모듈 내부 영역 어디에서든 참조 가능하도록 변수 설정
  var activation_index=0, $navi_button_group, $tab_panels, $tab_list, $tabs, $widget, $tab_wrapper, $global = $(global);
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

    // 애니메이션을 사용한다는 설정이 있을 경우, 애니메이션 처리
    using_animation && playCarousel();
  }
  /** @function 컴포넌트 하위 객체를 참조하는 함수 */
  function settingReferenceObjects() {
    $widget            = $('.ui-carousel');
    $tab_list          = $widget.find('.ui-carousel-tablist');
    $tabs              = $tab_list.find('a');
    $tab_wrapper       = $widget.find('.ui-carousel-tabpanel-wrapper');
    $tab_panels        = $tab_wrapper.children();
    $navi_button_group = $widget.find('.ui-carousel-button-group');
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
    // 사용자가 탭을 누르면 해당 탭을 출력
    $.each($tabs, function(index) {
      var $tab = $tabs.eq(index);
      $tab.on({
        'click': function(e){
          // 웹 브라우저 기본동작 차단
          e.preventDefault();
          // 탭 패널을 활성화
          activation_index = index;
          // 활성화된 인덱스 페이지로 이동하는 함수 실행
          activeTabPanel( activation_index );
        },
        'focus': stopCarousel
      });
    });
    // 이전/다음 탐색 버튼 이벤트 핸들링
    $navi_button_group.on('click', 'button', function(e) {
      var class_name = e.target.getAttribute('class');
      // prev 버튼 이벤트 처리
      if(class_name.includes('prev')) {
        activation_index = --activation_index < 0 ? ($tab_panels.length - 1) : activation_index;
      }
      // next 버튼 이벤트 처리
      else {
        activation_index = ++activation_index % $tab_panels.length;
      }
      activeTabPanel( activation_index );
    });

    // 자동 롤링 컨트롤 이벤트 핸들링
    $widget.on({
      'mouseenter': stopCarousel,
      'mouseleave': playCarousel
    });
  }

  /** @function 웹 브라우저 창 크기 조정에 따른 높이를 변경해주는 함수 */
  function resizeCarouselSize() {
    // 래퍼 객체 내부의 아이템 하나의 높이를 가져왔다.
    // $tab_wrapper.children().height()
    $widget.height( $tab_wrapper.children().height() );
  }

  function activeTabPanel( active_index ) {

    // 이동 거리
    var distance_x = -$tab_panels.eq(0).width() * active_index;

    // Pure CSS
    // $tab_wrapper.css('left', distance_x);

    // jQuery Animation
    // http://easings.net/ko
    $tab_wrapper.stop().animate({
      'left': distance_x
    }, 600);

    updateIndicators(active_index);
  }

  function updateIndicators(active_index) {
    $tabs.eq(active_index).parent().radioClass('active');
  }

  function playCarousel() {
    // 넥스트 버튼 클릭 이벤트 핸들링 시뮬레이션
    var $next_btn = $navi_button_group.find('.ui-carousel-next-button');
    stop_id = $ani.play( function() {
      $next_btn.trigger('click');
    }, animation_duration );
  }

  function stopCarousel() {
    $ani.stop(stop_id);
  }

  global.activeTabPanel = activeTabPanel;

})(window, window.jQuery, window.aniControl);
