###### Front-End Develop SCHOOL

## Javascript Advanced

[← 레퍼런스로 돌아가기](README.md)

### 모던 자바스크립트 패턴

1. [Javascript 안티 패턴을 보완하는 방법](js-03-anti-pattern.md)
1. Javascript 생성자(Constructor)와 리터럴(Literal)
1. [Javascript 함수](js-05-function.md)
1. [Javascript 객체 생성 패턴](js-06-create-object-pattern.md)
1. [Javascript 재사용 패턴](js-07-reusable-pattern.md)

-

### Javascript 생성자(Constructor)와 리터럴(Literal)

Javascript 리터럴을 사용하면 간단하게 객체를 생성할 수 있을 뿐만 아니라,
의도치 않는 오류 또한 줄여주는 효과를 볼 수 있다. 결과적으로 내장 생성자
(Native Constructor Function)보다는 리터럴(Literal)을 사용하자.

- [객체 리터럴(Object Literal)](#%EA%B0%9D%EC%B2%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4object-literal)
    - [객체 리터럴 문법](#%EA%B0%9D%EC%B2%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4-%EB%AC%B8%EB%B2%95)
    - [내장 생성자 함수(Native Constructor Function)](#%EB%82%B4%EC%9E%A5-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98native-constructor-function)
    - [객체 생성자를 사용하면 안되는 이유](#%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1%EC%9E%90%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%98%EB%A9%B4-%EC%95%88%EB%90%98%EB%8A%94-%EC%9D%B4%EC%9C%A0)
    - [사용자 정의 생성자 함수(User Define Constructor Function)](#%EC%82%AC%EC%9A%A9%EC%9E%90-%EC%A0%95%EC%9D%98-%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98user-define-constructor-function)
    - [`new`를 강제하는 패턴](#new%EB%A5%BC-%EA%B0%95%EC%A0%9C%ED%95%98%EB%8A%94-%ED%8C%A8%ED%84%B4)
    - [생성자 함수 이름 규칙](#%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98-%EC%9D%B4%EB%A6%84-%EA%B7%9C%EC%B9%99)
    - [`that` 사용](#that-%EC%82%AC%EC%9A%A9)
    - [스스로 호출하는 생성자](#%EC%8A%A4%EC%8A%A4%EB%A1%9C-%ED%98%B8%EC%B6%9C%ED%95%98%EB%8A%94-%EC%83%9D%EC%84%B1%EC%9E%90)
- [배열 리터럴](#%EB%B0%B0%EC%97%B4-%EB%A6%AC%ED%84%B0%EB%9F%B4)
    - [배열 생성자의 문제점](#%EB%B0%B0%EC%97%B4-%EC%83%9D%EC%84%B1%EC%9E%90%EC%9D%98-%EB%AC%B8%EC%A0%9C%EC%A0%90)
    - [배열 데이터 유형을 정확히 판별하기 위한 방법](#%EB%B0%B0%EC%97%B4-%EB%8D%B0%EC%9D%B4%ED%84%B0-%EC%9C%A0%ED%98%95%EC%9D%84-%EC%A0%95%ED%99%95%ED%9E%88-%ED%8C%90%EB%B3%84%ED%95%98%EA%B8%B0-%EC%9C%84%ED%95%9C-%EB%B0%A9%EB%B2%95)
- [JSON (Javascript Object Notation)](#json-javascript-object-notation)
    - [JSON 메서드](#json-%EB%A9%94%EC%84%9C%EB%93%9C)
- [정규표현식(RegExp)](#%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9Dregexp)
- [오류(Error) 객체](#%EC%98%A4%EB%A5%98error-%EA%B0%9D%EC%B2%B4)
- [생성자 함수에 대응하는 리터럴 표현식 정리](#%EC%83%9D%EC%84%B1%EC%9E%90-%ED%95%A8%EC%88%98%EC%97%90-%EB%8C%80%EC%9D%91%ED%95%98%EB%8A%94-%EB%A6%AC%ED%84%B0%EB%9F%B4-%ED%91%9C%ED%98%84%EC%8B%9D-%EC%A0%95%EB%A6%AC)


---

#### 객체 리터럴(Object Literal)

Javascript에서 객체는 `이름: 값` 쌍으로 묶여진 해시 테이블과 유사하다. 다른 언어의 '연관 배열'가 비슷. 함수, 배열 뿐만 아니라 원시 데이터 유형(Number, String, Boolean) 또한 모두 객체이며 값(Literal)이 될 수 있다. 즉, 모든 객체는 값이 될 수 있다. (함수의 경우, 값이 되면 메서드(Method)라고 불린다)

아래 코드를 통해 Javascript에서 객체를 생성하는 것이 얼마나 쉬운지 확인할 수 있다. `mug_cup` 이름을 가진 빈 객체를 생성한 후, 속성을 정의(추가)한다.

```js
// 객체 리터럴 표현식을 사용하여 객체 생성
var mug_cup = {};

// 생성된 객체의 속성 정의
mug_cup.content = '커피';

// 속성 메서드(함수 값) 추가
mug_cup.drink = function() {
    return this.content + '를 마시다.';
};
```

프로그램이 실행 중인 런타임(run-time) 중에 객체에 새로운 속성을 추가하거나, 제거 또한 가능하다.

```js
// 속성 재정의
mug_cup.drink = function(amount) {
    return this.content + '를 ' + amount + '만큼 마시다.';
};

// 속성 추가
mug_cup.count = 1;
mug_cup.broken = false;

// 속성 제거
delete mug_cup.broken;
```

위에서 다룬 `mug_cup` 객체 생성에서 처럼 빈 객체에서 시작한 후 속성을 추가하는 방법 말고, 객체 리터럴 표현식을 활용하여 생성과 동시에 속성을 정의할 수도 있다.

```js
// 객체 생성, 속성 정의(추가)
var mug_cup = {
    'count'   : 1,
    'broken'  : false,
    'content' : '커피',
    'drink'   : function(amount) {
        return this.content + '를 ' + amount + '만큼 마시다.';
    }
};

// 객체 속성 제거
delete mug_cup.broken;
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

###### 객체 리터럴 문법

- 중괄호(`{}`)를 사용하여 객체를 생성한다.
- 속성과 값은 콜론(`:`)으로 구분하고, 각 속성은 콤마(`,`)로 구분한다.
- 객체 리터럴을 변수에 할당할 때는 닫는 중괄호(`}`) 뒤에 반드시 세미콜론(`;`)을 붙인다.

> 대부분의 웹 브라우저에서 아래와 같이 마지막 이름-값 쌍 뒤에 쉼표가 들어가도 오류가 발생하지 않지만, IE 웹 브라우저는 오류가 발생할 수 있음으로 주의해야 한다.

```js
var mug_cup = {
    'count'   : 1,
    'broken'  : false,
    'content' : '커피',
    'drink'   : function(amount) {
        return this.content + '를 ' + amount + '만큼 마시다.';
    }, // 마지막 속성 구문에 콤마가 있으면 IE는 오류를 발생한다.
};
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 내장 생성자 함수(Native Constructor Function)

Javascript는 클래스(Class)가 없는 언어로 알려져 있지만, ECMAScript v6(ES 6)부터 클래스(Class)를 사용할 수 있게 된다. 아무튼 ES 6에서는 정식으로 클래스를 사용할 수 있겠지만, ES 5 이하 버전에서는 생성자 함수를 사용하여 JAVA의 Class 객체 생성 방법과 유사한 문법을 사용하여 객체를 생성할 수 있다.

생성자 함수는 Javascript에 내장(Built-In)된 것과 사용자가 직접 정의(User-Define)하는 것으로 구분된다. 앞서 우리가 만든 `mug_cup` 객체는 리터럴 표현식을 사용하여 사용자가 정의한 객체이다. 이를 내장 생성자 함수를 사용하여 정의하면 다음과 같다. (이 방법은 사용하지 않는 것이 좋다)

```js
var mug_cup = new Object();

mug_cup.content = '커피';
mug_cup.drink = function(amount) {
    return this.content + '를 ' + amount + '만큼 마시다.';
};
mug_cup.broken = false;
mug_cup['count'] = 1; // 대괄호([]) 표기법으로도 가능.
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 객체 생성자를 사용하면 안되는 이유

`Object()` 생성자 함수는 인자(argument)를 받을 수 있는데 이를 해석하여 임의로 다른 내장 생성자에게 객체 생성을 위임할 수 있다. 즉, 의도치 않은 객체 생성이 될 수 있어 문제가 된다.

```js
// 객체 생성
var obj = new Object();
console.log( obj.constructor === Object ); // true

// 숫자 객체 생성
var obj = new Object(9);
console.log( obj.constructor === Object ); // false
console.log( obj.constructor === Number ); // true

// 문자 객체 생성
var obj = new Object('의도치 않은 객체 생성');
console.log( obj.constructor === Object ); // false
console.log( obj.constructor === String ); // true

// 불린 객체 생성
var obj = new Object(true);
console.log( obj.constructor === Object ); // false
console.log( obj.constructor === Boolean ); // true
```

`Object()` 생성자의 이 같은 동작 방식 때문에 예기치 않은 결과를 초래할 수 있어 사용을 하지 않는 것이 좋다. 즉, `new Object()`는 사용하지 않는 것이 좋다. 결론은 리터럴 표현식을 사용하라.

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 사용자 정의 생성자 함수(User Define Constructor Function)

앞서 공부한 객체 리터럴 패턴이나 객체 내장 생성자 함수를 사용하지 않고, 사용자가 정의한 생성자 함수로 객체를 생성할 수도 있다. 이 방법은 JAVA에서 Class를 사용하여 객체를 생성하는 방법과 매우 유사하다. 하지만 이는 Class가 아닌, Javascript 함수일 뿐이다.

```js
var MugCup = function(content) {
    this.content = content;
    this.count   = 1;
    this.broken  = false;
    this.drink   = function(amount) {
        return this.content + '를 ' + amount + '만큼 마시다.';
    };
};
```

`new` 키워드와 함께 생성자 함수를 호출하면 다음과 같이 처리된다.

1. 빈 객체가 생성된다. 이 객체는 `this` 변수로 참조 가능하며, 해당 함수의 `prototype`을 상속받는다.
1. `this`로 참조되는 객체에 속성(메서드 포함)이 추가된다.
1. 다른 객체를 명시적으로 반환(`return`)하지 않을 경우, `this`로 참조된 객체가 반환된다.

처리 과정을 코드로 재현하면 아래와 같다.

```js
var MugCup = function(content) {

    // 프로토타입 상속 및 this 참조 객체 생성
    // var F       = function() {};
    // F.prototype = MugCup.prototype;
    // var this    = new F();

    // this 참조 객체에 속성 추가
    this.content = content;
    this.count   = 1;
    this.broken  = false;
    this.drink   = function(amount) {
        return this.content + '를 ' + amount + '만큼 마시다.';
    };

    // 암묵적으로 this 참조 객체 반환
    // return this;
};
```

위 예에서 `drink()` 메서드의 경우, `new MugCup()`을 호출할 때 마다 메모리에 새로운 함수가 생성된다. `drink()`라는 메서드는 생성된 인스턴스 객체마다 달라지는 것이 아니므로 이와 같은 방식은 비효율적이다. 이 메서드는 `MugCup`의 `prototype`에 추가하는 것이 효과적이다.

```js
MugCup.prototype.drink = function(amount) {
    return this.content + '를 ' + amount + '만큼 마시다.';
};
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### `new`를 강제하는 패턴

생성자란? `new` 키워드와 함께 호출될 뿐 일반 함수에 불과하다. 하지만 `new`를 빼먹으면 문법 오류나 런타임 에러가 발생하지는 않지만, 논리적인 오류가 생겨 의도치 않은 결과가 발생할 수도 있다. 이유는 `new`를 빼먹고 생성자 함수를 호출할 경우 `this`가 전역(Global) 객체를 가리키기 때문이다. (웹 브라우저 환경에서 `this`는 `window` 객체를 가리킨다) 이는 전역을 오염시키는 행위가 되기 때문에 피해야 할 상황이다.

```js
// 생성자
function Coffee() {
    this.tastes = '부드러움';
}

var my_coffee    = new Coffee(),
    other_coffee = Coffee(); // new를 빼먹었다!

console.log( my_coffee.constructor === Coffee );    // true
console.log( other_coffee.constructor === Coffee ); // Undefined
console.log( window.tastes );                       // '부드러움'
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 생성자 함수 이름 규칙

생성자 함수 이름의 첫 글자를 대문자로 작성하여 일반 함수 이름과 구별되도록 한다.

```js
// 생성자 함수 이름
function MemoryStack() { ... };

// 일반 함수 이름
function memoryStack() { ... };
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### `that` 사용

생성자 함수 이름 작성 규칙을 따르는 것도 도움이 되겠지만 이는 권고(Recommendation)일 뿐, 강제(Force)하지 못한다. 생성자 함수가 항상 생성자 함수로 동작되도록 해주는 패턴을 알아보자. `this`에 모든 멤버를 추가하는 대신, `that`에 모는 멤버를 추가한 후 `that`을 반환하는 것이다. 이 방법을 사용하면 `new`를 빼먹어도 전역 객체의 속성으로 오염시키는 불상사를 예방할 수 있다.

```js
function MemoryStack(memories) {
    var that = {};
    that.stacks = memories;
    return that;
}
```

간단한 객체일 경우, `that` 지역 변수 생성 과정을 거치지 않고 객체 리터럴을 통해 객체를 반환해도 된다.

```js
function MemoryStack(memories) {
    return {
        stacks : memories;
    };
}
```

`that`을 사용하거나 객체 리터럴을 반환하는 패턴 모두 `new`를 빼먹어도 문제가 발생하지 않지만, 문제는 생성자의 `prototype` 링크(연결고리)를 잃어버리게 된다. 즉, 생성자의 프로토타입 속성을 사용할 수 없게 된다.

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 스스로 호출하는 생성자

앞서 다룬 패턴의 문제점을 해결하기 위한 방법으로 생성자 함수 내부에서 `this` 객체가 해당 생성자의 인스턴스 객체임을 확인한 후, 그렇지 않을 경우 `new`와 함께 스스로 다시 호출하는 방법을 사용한다.

```js
function MemoryStack(memories) {
    if ( this.constructor !== MemoryStack ) {
        return new MemoryStack(memories);
    }
    this.stacks = memories;
}

MemoryStack.prototype.addMemory = function() {};
```

이 방법을 사용하면 `new`를 빼먹어도 문제가 발생하지 않고, `prototype` 객체 링크 또한 문제없이 처리된다.

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

---

#### 배열 리터럴

배열이란? 결국 인덱스 0으로 시작하는 값의 집합이다. `new`와 함께 사용해야 하는 생성자보다는 간단하고 직관적이며 우아한 리터럴 문법을 사용하는 것이 좋다.

```js
// 안티 패턴: 배열 생성자 사용
var avengers = new Array('캡틴 아메리카', '아이언맨', '헐크', '토르');

// 굿 패턴: 배열 리터럴 사용
var avengers = ['캡틴 아메리카', '아이언맨', '헐크', '토르'];

console.log( typeof avengers );      // 'object' ※ typeof의 사용 시, 주의점.
console.log( avengers.constructor ); // Array
```

-

##### 배열 생성자의 문제점

`new Array()`를 사용하지 말아야 할 또 다른 이유로 `Array()` 생성자에 숫자 하나를 전달할 경우, 의도치 않게 동작하기 때문이다. 기대한 결과는 전달한 숫자가 배열의 첫 번째 원소 값이 되어야 하지만, 실제 처리 결과는 배열의 개수(`length`)를 지정한다. 즉, `new Array(2)`는 `[2]`로 처리되는 것이 아니라, `[undefined, undefined]`로 처리된다.

```js
var avengers = new Array(4);
console.log( avengers.length ); // 4
console.log( avengers[0] );     // undefined

var avengers = [4];
console.log( avengers.length ); // 1
console.log( avengers[0] );     // 4
```

뿐만 아니라 `new Array()`에 정수가 아닌 부동소수점을 전달할 경우 배열이 생성되지 않고, RangeError가 발생한다.

```js
var pi = [3.14];
console.log( pi ); // 3.14

var pi = new Array(3.14);
console.log( pi );              // 배열 개수(length)로 유효하지 않은 값이기에 RangeError 발생
console.log( typeof avengers ); // 'undefined'
```

정리하면 배열 리터럴을 사용하는 것이 배열 생성자를 사용하는 것보다 간단하며 안전하다.

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

-

##### 배열 데이터 유형을 정확히 판별하기 위한 방법

Javascript 데이터 유형을 체크할 때 자주 사용하는 `typeof`는 배열의 경우 제대로 유형을 파악할 수 없다. (`'array'`가 아닌, `'object'`를 반환) 물론 배열도 객체이니 완전히 틀린 것은 아니지만 객체(Object)와 구분되지 않아 그다지 도움이 되지 않는다. 그렇다면 배열 데이터 형을 올바르게 체크해야 할 경우 어떤 방법을 사용해야 하나? `instanceof`를 사용하는 것도 방법이 될 수 있지만 일부 IE에서는 프레임간 사용시 올바르게 동작하지 않는 문제가 있다. 이 문제는 ES 5에서 해결된다. 새롭게 추가된 `Array.isArray()`를 사용하여 정확하게 배열 유형인지 파악할 수 있다.

```js
Array.isArray([]); // true
Array.isArray({}); // false
```

실행 환경에서 ES 5를 지원하지 않는 경우라면 이를 직접 정의하면 된다. (Array 생성자 객체에 isArray() 메서드 추가)

```js
if ( !Array.isArray ) {
    Array.isArray = function(data) {
        // 전달된 데이터 값의 생성자가 Array인지를 비교하여 결과를 반환
        return data.constructor === Array;
    }
}
```

위 방법은 객체를 전달할 경우 문제 없이 `true`, `false`를 반환하지만 객체가 아닌 `null`, `undefined`를 전달하면 오류(TypeError)를 발생시킨다. 이 문제까지 해결하는 완벽한 방법은 `Object.prototype.toString()`을 빌려서 데이터 유형을 체크하는 방법을 사용한다. 아래 코드를 보자.

```js
if ( !Array.isArray ) {
    Array.isArray = function(data) {
        // Object.prototype.toString() 메서드를 빌려 data 사용하면 데이터 유형을 체크할 수 있다.
        return Object.prototype.toString.call(data) === '[object Array]';
    }
}
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

---

#### JSON (Javascript Object Notation)

JSON이란? 자바스크립트 객체 표기법의 준말이며 데이터 전송 형식의 일종으로 자바스크립트를 비롯한 다양한 언어에서 가볍고 편리하게 사용가능하다. JSON은 새로울 것은 없고, 배열과 객체 레터럴 표기법의 조합일 뿐이다. 다만 속성 이름을 쌍 따옴표로 감싸야 한다는 점이 일반 배열, 객체 리터럴과의 차이점이다. 그리고 함수, 정규 표현식등은 사용할 수 없다.

```js
[
    {
        "name": "헐크",
        "unit": "어벤져스"
    },
    {
        "name": "아이언맨",
        "unit": "어벤져스"
    }
]
```

##### JSON 메서드

`eval()`을 사용하여 JSON 문자열을 처리하는 것은 보안상 문제가 있으므로 사용하지 않아야 한다. JSON 문자열을 해석하려면 `JSON.parse()`를 사용해야 한다. 이 메서드는 ES 5부터 포함되지만, 대다수 최신 브라우저는 이를 내장하고 있어 사용에 큰 문제가 없다. 다만 구형 웹 브라우저는 이를 지원하고 있지 않아 라이브러리([http://json.org/json2.js](http://json.org/json2.js))를 호출하여 사용해야 한다.

```js
var json_str = '{"name":"헐크","unit":"어벤져스"}', data;

// 안티 패턴: eval() 함수 사용
data = eval( '(' + json_str + ')' );

// 굿 패턴: JSON.parse() 메서드 사용
data = JSON.parse( json_str );
```

이미 사용 중인 자바스크립트 라이브러리가 있다면 `JSON.parse()` 메서드를 내장했을 가능성이 크다. 예를 들어 jQuery 라이브러리를 사용하고 있다면 `jQuery.parseJSON()` 메서드를 사용할 수 있다.

```js
var json_str = '{"name":"헐크","unit":"어벤져스"}',
    data     = jQuery.parseJSON( json_str );

console.log( data.unit ); // '어벤져스'
```

`JSON.parse()`가 처리하는 일의 반대 역할은 `JSON.stringify()`를 사용한다. 이 메서드는 객체, 배열 데이터를 전달 받아 JSON 문자열로 변경(직렬화)한다.

```js
var avengers = [
    {
        'name': '헐크',
        'unit': '어벤져스'
    },
    {
        'name': '아이언맨',
        'unit': '어벤져스'
    }
];

JSON.stringify( avengers ); // '[{"name":"헐크","unit":"어벤져스"},{"name":"아이언맨","unit":"어벤져스"}]'
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

---

#### 정규표현식(RegExp)

Javascript에서는 정규 표현식(Regular Expression) 역시 객체이다. 생성 방법은 생성자를 사용하는 방법과 리터럴을 사용하는 방식이 있다. 물론 리터럴을 사용하는 방법을 쓰는 것이 권장된다.

- new RegExp() 생성자 함수를 사용한다.
- 정규 표현식 리터럴 패턴을 사용한다.

```js
// 정규표현식 생성자 함수 사용
var reg = new RegExp('\\\\', 'igm');

// 정규표현식 리터럴 사용
var reg = /\\/igm;
```

일견하기에도 정규표현식 리터럴이 생성자 함수 사용방법보다 짧고, 쓰기 편하다. 뿐만 아니라 생성자 함수를 사용하면 따옴표(')나 역슬래시(/) 등을 이스케이프(Escape) 처리해야 한다. 즉, 역슬래시 하나를 매치시키기 위해 네 개의 역슬래시가 필요하게 되니 얼마나 코드가 복잡해지는지 알 수 있다. 해석하기도 어려울 뿐더러 수정하기 또한 불편하다. 정규표현식은 그 자체로도 어렵기 때문에 이를 조금이라도 간단하게 만드는게 중요하다. 고로 정규표현식 리터럴을 사용하는 것이 좋다. 단, 매칭시킬 패턴을 미리 알 수 없고 런타임 중에 문자열로 만들어지는 경우에는 `new RegExp()`를 사용해야 한다. 아래 `hasClass()` 예제를 살펴보자.

```js
function hasClass(element, class_name) {
    var el_class = element.getAttribute('class'),
        // 정규표현식 해석: \s는 '공백 문자', ^는 '시작', $는 '끝'
        // http://www.w3schools.com/jsref/jsref_obj_regexp.asp
        filter   = new RegExp( '(^|\\s)' + class_name + '(\\s|$)');

    return !!el_class.match( filter );
}
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

---

#### 오류(Error) 객체

Javascript에는 `Error()`, `SyntaxError()`, `TypeError()` 등 다양한 오류 생성자가 내장되어 있으며 `throw`문과 함께 사용된다. 이 생성자들로 생성된 오류 객체는 다음과 같은 속성을 가진다.

- `name`: 객체를 생성한 생성자 함수의 name 속성
- `message`: 객체를 생성할 때 새엇ㅇ자에 전달된 문자열

사실 `throw` 문은 어떤 객체와도 함께 사용이 가능하다. 즉, 반드시 오류 생성자를 통해 객체를 생성해야 하는 것은 아니다. 직접 정의한 객체 또한 `throw`와 함께 사용 가능한 것이다. 아래 예제를 살펴보면 생성자 함수가 아닌 직접 생성한 객체를 사용하여 창의적으로 문제 발생을 확인 후, 정상 상태로 복구하기 위한 해결책(Solution)을 활용하는 것을 볼 수 있다.

```js
try {
    // 오류 발생
    throw {
        'name'    : 'My Error Type',
        'message' : '오류 발생!!',
        'solution': function() {} // 오류를 처리할 함수 정의
    }
} catch(error) {
    // 오류 발생 메시지를 콘솔(Console)에 출력
    console.error( error.message );
    // 오류 발생 시, 처리해야 할 함수 실행
    error.solution();
}
```

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)

---

#### 생성자 함수에 대응하는 리터럴 표현식 정리

일반적으로 `Math()`, `Date()` 생성자를 제외하면 내장 생성자를 쓸 일이 거의 없다. 다음 표는 내장 생성자에 대응하는 리터럴 패턴을 정리한 것이다.

| 내장 생성자(사용 자제) | 리터럴(사용 권장) |
| --- | --- |
| var num = new Number(9); | var num = 9; |
| var str = new String(''); | var str = ''; |
| var boo = new Boolean(true); | var boo = true; |
| var fnc = new Function(); | var fnc = function(){}; |
| var arr = new Array(); | var arr = []; |
| var obj = new Object(); | var obj = {}; |
| var reg = new RegExp('[a-z]', 'g'); | var reg = /[a-z]/g; |
| throw new Error('Oops'); | throw = { 'name': 'Error', 'message': 'Oopes' } |

[`Javascript 생성자(Constructor)와 리터럴(Literal) 상위로 이동 ↑`](#javascript-%EC%83%9D%EC%84%B1%EC%9E%90constructor%EC%99%80-%EB%A6%AC%ED%84%B0%EB%9F%B4literal)