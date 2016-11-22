/*! closure.js © yamoo9.net, 2016 */

// 자바스크립트 클로저 영역과 반환 데이터
// 참조형 데이터 반환 - 객체, 배열, 함수

var countDownInit = function(init_count) {
  var function_name = 'countDownInit';
  // init_count 초기 설정 변수 값
  // 함수 영역 안쪽에 감춰진 함수
  var countDown = function() {
    return init_count--;
  };
  return countDown;
};

var countDown10 = countDownInit(10);

countDown10(); // 10
countDown10(); //  9
countDown10(); //  8
countDown10(); //  7
countDown10(); //  6

