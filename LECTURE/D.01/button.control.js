/*! controll.js © yamoo9.net, 2016 */
(function(){
  /** @function square() 정의 */
  function square(n) {
    // 전달인자의 데이터 유형 검증
    if ( typeof n !== 'number' ) {
      throw new Error('전달인자 유형은 숫자만 가능합니다.');
    }
    return n * n;
  }
  // var clickPrintSquare; // undefined

  // square() 실행 결과 출력
  // console.log( 'square:', square(10) );

  // Todo:
  // 1. 문서에서 button 요소와 p 요소를 찾아 변수에 참조
  var print_square_button = document.querySelector('.print-square-button');
  var print_square_area   = document.querySelector('.print-square-area');

  // 이벤트 핸들러 정의
  var clickPrintSquare = function (){
    // [GET] 버튼 객체의 속성 data-squre-value 값을 가져와 변수 n에 복사
    var n = this.getAttribute('data-square-value');
    // n = +n;
    n = Number(n); // Number() 데이터 유형을 숫자로 변경
    print_square_area.textContent = square(n);
    // [SET] 버튼 객체의 속성 data-squre-value 값 변경
    // 가지고 온 속성 값의 유형은 `문자`
    // console.log('before:', n, typeof n);
    // 숫자형 문자 -> 숫자
    // 유형 변경
    // 변경된 데이터 유형 `숫자`
    // console.log('after:', n, typeof n);
    // 선 증가로 값을 변화, 속성 값으로 대입
    this.setAttribute('data-square-value',  ++n);
  };

  // 검증
  console.log('print_square_button:', print_square_button); // null
  console.log('print_square_area:', print_square_area);     // null

  // 2. button 요소를 참조한 변수를 통해 사용자가 click 행위를 수행하면 이벤트를 발생시킴
  // 구형
  // console.log( print_square_button.onclick ); // null
  // 이벤트 속성에 핸들러(함수)를 연결(바인딩)
  // ES 3,5
  print_square_button.onclick = clickPrintSquare;

  // 자바스크립트에서 호이스트란?

  // var, function 키워드로 정의된 것들이 scope의 상단으로 끌어올려지는 현상을 말한다.
  // 주의할 점은 function 선언문과 달리 var 키워드의 경우는 변수 이름만 끌어 올리고,
  // 값이 대입(할당)되는 시점은 실제 코드가 작성된 곳에서 진행된다.


  // 함수 표현식
  // var clickPrintSquare = function (){
  //   console.log('this:', this);
  // };
  // 함수 선언식
  // function clickPrintSquare(){
  //   console.log('this:', this);
  // };

  // ES 6+, Arrow Function
  // print_square_button.onclick = ()=>{};
  // 신형(표준), IE 9+
  // print_square_button.addEventListener()
  // 신형(비표준) IE 8-
  // print_square_button.attachEvent()

  // 3. 발생된 이벤트를 처리할 함수를 정의합니다.
  // 4. 정의된 함수 내부에서는 p 요소의 내용으로 squre() 함수의 연산 결과를 출력합니다.
  // ※ suqre() 함수의 전달 인자는 button 요소의 data-square-value 값을 가져와 사용합니다.
}());