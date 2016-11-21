###### WPS.FastCampus

# D.01

### 1. Front-End 개발 환경에 대한 이야기

- 웹 표준
- 접근성
- 성능
- 크로스 플랫폼/브라우징 이슈
- 기획자, 디자이너, Back-End 개발자와의 협업
- __※ 기획자, 디자이너, Back-End 개발자 간 서로의 영역에 대한 이해와 존중이 필요!__

-

### 2. JavaScript 코어

- 데이터 유형
  - 원시 데이터
  - 참조 데이터
- 생성자 함수와 프로토타입
- 데이터 유형 별, 리터럴(Literal)
- 데이터 유형 체크
  - `typeof`
  - `instanceof`
  - `.constructor`
  - `type()` 유틸리티 함수
  - 데이터 유형 별, 별칭(Alias) 함수
- IIFE를 활용한 모듈/노출 패턴

##### 모듈 패턴

```js
/*! understanding_module.js © yamoo9.net, 2016 */

// 모듈 패턴(모듈 흉내)
// 프론트엔드 환경에서는 IIFE 패턴(즉시 실행함수)을 사용
var buttle = '버틀';

(function(global){
  // 엄격한 자바스크립트 (모드 변경: change strict mode)
  'use strict';
  // 비공개
  var buttle = 'latte';
  console.log('in module:', buttle); // 'latte'
  // 공개
  global.cup = 'coffee';

}(window));

// console.log('out:', cup); // 'coffee';
// console.log('out:', buttle); // is not defined
```

-

### 3. JavaScript 모듈

```js
.
├── dom.js
└── utils
    ├── isNumber.js
    └── validate.js
```

##### 모듈 단위별 개발

```js
/*! validate.js © yamoo9.net, 2016 */
(function(global, dom){
  'use strict';

  function validate(condition, err_message) {
    if (condition) {
      throw new Error(err_message);
    }
  }

  dom.utils = dom.utils || {};
  dom.utils.validate = validate;

})(this, (this.dom = this.dom || {}));
```

##### 의존 모듈 주입 후, 개발

```js
/*! square.js © yamoo9.net, 2016 */
(function(global, dom){
  'use strict';

  var utils = dom.utils;

  global.square = function(n) {
    utils.validate(!utils.isNumber(n), '전달인자는 숫자여야 함.');
    return n * n;
  };

})(this, this.dom);
```

-

### 4. 문서객체모델(DOM) API + JavaScript

1. 문서객체 요소노드 참조
1. 이벤트 프로퍼티에 핸들러 바인딩
1. 이벤트 핸들러(함수) 로직 구현

```js
/*! button.control.js © yamoo9.net, 2016 */
(function(){
  'use strict';

  // 문서객체 참조
  var print_square_button = document.querySelector('.print-square-button');
  var print_square_area   = document.querySelector('.print-square-area');

  // 핸들러
  var clickPrintSquare = function (){
    var n = this.getAttribute('data-square-value');
    // 데이터 유형 변경 (숫자형 문자 → 숫자)
    n = Number(n);
    print_square_area.textContent = square(n);
    this.setAttribute('data-square-value',  ++n);
  };

  // 이벤트 바인딩
  print_square_button.onclick = clickPrintSquare;

}());
```