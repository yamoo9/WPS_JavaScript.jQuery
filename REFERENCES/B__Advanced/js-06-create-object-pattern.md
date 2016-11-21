###### Front-End Develop SCHOOL

## Javascript Advanced

[← 레퍼런스로 돌아가기](README.md)

### 모던 자바스크립트 패턴

1. [Javascript 안티 패턴을 보완하는 방법](js-03-anti-pattern.md)
1. [Javascript 생성자(Constructor)와 리터럴(Literal)](js-04-constructor.md)
1. [Javascript 함수](js-05-function.md)
1. Javascript 객체 생성 패턴
1. [Javascript 재사용 패턴](js-07-reusable-pattern.md)

-

### Javascript 객체 생성 패턴

Javascript 세상에서는 객체 리터럴, 생성자 함수를 사용하면 아주 손쉽게 객체를 만들 수 있다. 다른 언어와 달리 Javascript는 간단하고 평이하다. (덕분에 직접 구현해야 할 것들이 많다) 예를 들면 네임스페이스(Namespace), 모듈 패키지(Module Package), 비공개 멤버(Private Members), 정적 멤버(Static Members) 등을 Javascript는 제공하지 않아 직접 구현해야 한다. (물론 이미 구현된 라이브러리, 프레임워크를 사용하는 것도 방법이다)

네임스페이스 패턴, 의존 관계 선언, 모듈 패턴, 샌드박스 패턴 등은 애플리케이션 코드를 정리하고 구조화하는데 도움이 된다. 나아가 전역(Global Scope)을 오염시키는 것을 막을 수 있다. 오늘 날 애플리케이션 개발에 필히 요구되는 기능을 직접 구현해보자.

- [네임스페이스 패턴](#%EB%84%A4%EC%9E%84%EC%8A%A4%ED%8E%98%EC%9D%B4%EC%8A%A4-%ED%8C%A8%ED%84%B4)
- [의존 관계 선언](#%EC%9D%98%EC%A1%B4-%EA%B4%80%EA%B3%84-%EC%84%A0%EC%96%B8)
- [비공개 프로퍼티와 메소드](#%EB%B9%84%EA%B3%B5%EA%B0%9C-%ED%94%84%EB%A1%9C%ED%8D%BC%ED%8B%B0%EC%99%80-%EB%A9%94%EC%86%8C%EB%93%9C)
- [모듈 패턴](#%EB%AA%A8%EB%93%88-%ED%8C%A8%ED%84%B4)
- [샌드박스 패턴](#%EC%83%8C%EB%93%9C%EB%B0%95%EC%8A%A4-%ED%8C%A8%ED%84%B4)
- [스태틱 멤버](#%EC%8A%A4%ED%83%9C%ED%8B%B1-%EB%A9%A4%EB%B2%84)
- [체이닝 패턴](#%EC%B2%B4%EC%9D%B4%EB%8B%9D-%ED%8C%A8%ED%84%B4)

---

#### 네임스페이스 패턴

네임스페이스(Namespace)는 애플리케이션에서 요구하는 전역 변수의 개수를 줄이는 동시에 과도한 접두사를 사용하지 않고도 충돌나지 않게 해준다. (이름이 동일하면 덮어쓰게 되어 프로그래밍이 망가진다) Javascript 언어 자체에는 구현되어 있지 않지만, 네임스페이스를 사용하는 것은 어렵지 않다. 전역을 어지럽히는 변수, 함수, 객체 등을 애플리케이션이나 라이브러리를 위한 전역 객체 하나에 묶어주면 된다.

```js
// ---------------------------------
// 안티패턴. 전역을 오염시키는 행위

// 생성자 함수 2개
function Parent() {}
function Child() {}

// 전역 변수 3개, 객체 2개
var some_var = 1;
var module_1 = {};
module_1.data = {'a':1, 'b':2};
var module_2 = {};
```

위와 같은 안티패턴의 코드를 네임스페이스 패턴으로 리팩토링하면 아래와 같다. 애플리케이션 전용 전역 객체를 생성한 후, 모든 변수, 함수, 객체를 묶어주면 된다. (참 쉽다)

```js
// ---------------------------------
// 네임스페이스 패턴. 전역 객체 하나에 묶음

// 애플리케이션 전용 객체(전역에 선언)
var APP = {};

// 생성자 함수를 애플리케이션 전용 객체의 속성에 할당
APP.Parent = function() {};
APP.Child = function() {};

// 애플리케이션 멤버(속성) 설정
APP.some_var = 1;

// 애플리케이션 모듈 컨테이너 객체 생성
APP.modules = {};

// 애플리케이션 모듈 컨테이너 객체 내부에 하위 모듈 객체 생성
APP.modules.module_1 = {};
APP.modules.module_1.data = {'a':1, 'b':2};
APP.modules.module_2 = {};
```

일반적으로 이름이 모두 대문자인 경우는 상수를 말하지만, 변수 이름을 모두 대문자로 사용함으로 지우거나 변경하면 안된다는 것을 암시할 수 있다. (하지만 꼭 그렇게 사용해야 하는 것은 아니다)

네임스페이스 패턴은 전역에 선언된 변수를 네임스페이스로 지정하여 코드 내 이름 충돌 뿐 아니라 다른 라이브러리 코드와의 이름 충돌 또한 방지한다. 오늘 날 꼭 필요한 패턴이고 권장되는 방법이다.

하지만 단점이 없는 것은 아니다. 단점을 나열하면 아래와 같다.

- 변수,함수에 네임스페이스 이름이 붙어야 해서 코드량이 많아져 파일 크기가 늘어난다.
- 전역 변수가 단 하나라서 코드의 어느 한 부분이 수정되어도 전역 변수가 수정되게 된다.
- 이름이 중첩되고 길어지므로 속성을 판별하기 위한 검색 작업이 길어진다. (샌드박스 패턴으로 해결)

-

#### 네임스페이스 생성을 위한 헬퍼 함수

애플리케이션 복잡도가 증가하고 코드의 개별 부분이 분리되어 선택적으로 문서에 포함된다면, 어떤 코드가 특정 네임스페이스나 내부 속성을 처음으로 정의한다고 가정하기 어렵다. 네임스페이스에 추가하려는 속성이 이미 존재할 수도 있기 때문에 덮어 쓸 우려가 있다. (기존 코드가 사라짐) 그러므로 네임스페이스를 생성하거나 프로퍼티를 추가하기 전에 먼저 존재 유무를 파악하는 것이 최선이다.

```js
// [위험!] APP 전역 변수가 이미 정의되었다면
// 아래 코드는 해당 변수를 덮어쓰게 되어
// 기존에 작성된 코드는 사라지게 된다.
var APP = {};

// 이를 피하는 개선 방법은 APP 전역 변수 유무를
// 먼저 파악해야 한다.
(function(APP){
    // APP이 존재한다면 존재하는 코드를
    // 존재하지 않는다면 새로운 객체를 생성
})( window.APP || (window.APP={}) );
```

이렇게 검증하는 방법은 확인 과정에서 상당한 양의 코드를 증가시킬 수 있다. 예를 들어 APP.modules.module_1을 검증하려면 각 단계의 객체와 속성을 확인해야 하기 때문에 매우 번거롭다.

```js
// 검증하고자 하는 것이 많아지면 코드 양이 증가되고 복잡해진다.
(function(APP, modules, module_1){
    // APP, modules, module_1을 사용
})(
    window.APP || (window.APP={}),
    APP.modules || (APP.modules={}),
    APP.modules.module_1 || (APP.modules.module_1={}),
);
```

이러한 문제는 네임스페이스 생성 및 확인 과정을 처리해 줄 재사용 가능한 헬퍼 함수를 만들어 사용하면 손쉽게 해결할 수 있다. 이 함수를 `$namespace()`라 하고 사용해보자.

```js
(function(module_1){
    // $namespace() 헬퍼함수를 통해
    // 네임스페이스 객체와 각 속성이 존재하는지
    // 유무를 파악한 후, 필요하다면 네임스페이스
    // 객체를 생성한다.
})( $namespace('APP.modules.module_1') );


// $namespace() 헬퍼 함수는 검증 과정을 통해
// 다음과 같은 코드 결과를 구현한다.
var APP = {
    'modules': {
        'module_1': {}
    }
};
```

`$namespace()` 헬퍼함수를 구현하면 다음과 같다.

```js
/*! $namespace.js © yamoo9.net, 2016 */
(function(exports){
    'use strict';
    var toString = Object.prototype.toString,
        $namespace = function(ns_str) {
            if ( typeof ns_str !== 'string' ) {
                throw new Error('전달인자는 문자 유형만 가능합니다.');
            }
            var ns_arr = ns_str.split('.'), _namespace;
            ns_arr.forEach(function(ns, index) {
                if ( index === 0 ) {
                    if ( toString.call(exports[ns]) !== '[object Object]' ) {
                        exports[ns] = {};
                    }
                    _namespace = exports[ns];
                } else {
                    if ( toString.call( _namespace[ns] ) !== '[object Object]' ) {
                        _namespace[ns] = {};
                    }
                    _namespace = _namespace[ns];
                }
            });
        return _namespace;
    }
    exports.$namespace = $namespace;
})(this);
```

`$namespace()` 헬퍼 함수는 다음과 같이 활용 가능하다.

```js
var module_2 = $namespace('APP.modules.module_2');
console.log(module_2 === APP.modules.module_2); // true
```

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 의존 관계 선언

Javascript 라이브러리들은 대부분 네임스페이스를 지정하여 모듈화되어 있기에 필요한 모듈만 골라 사용 가능하다. 이럴 경우 함수나 모듈 영역 최상단에 의존 관계에 있는 모듈을 선언하는 습관을 가지는 것이 좋다. 즉, 지역 변수를 만들어 원하는 모듈을 참조하도록 선언한다.

```js
(function(){
    'use strict';

    // APP 네임스페이스 객체의 각 모듈을
    // 지역 변수에 할당하여 영역 내에서 사용한다.
    var utils  = $namespace('APP.modules.utils'),
        events = $namespace('APP.modules.events');

})();
```

간단한 패턴이지만 상당한 장점이 있다.

- 의존 관계가 명시적으로 선언되기 때문에 개발 과정에 꼭 필요한 의존 관계를 알 수 있다.
- 영역의 첫머리에 의존 관계가 선언됨으로 의존 관계를 손쉽게 이해할 수 있고 찾기 쉽다.
- events 같은 지역 변수는 전역 변수를 통해 찾는 것보다 항상 빠르게 동작한다.
- 압축 도구는 지역 변수 이름을 축약해주지만, 전역 변수 이름은 위험하기에 축약하지 않는다.

코드를 압축했을 경우, 의존 관계 선언 패턴의 효과를 볼 수 있다. 지역 변수에 참조하여 사용한 결과가 전역 변수를 참조한 것보다 코드 양이 줄어드는 것을 볼 수 있다.

```js
// 코드 1. 전역 변수 사용
(function(){
    console.log(APP.modules.utils);
    console.log(APP.modules.events);
    console.log(APP.modules.dom);
    console.log(APP.modules.ajax);
})();

// 코드 1. 압축 결과
(function(){console.log(APP.modules.utils);console.log(APP.modules.events);console.log(APP.modules.dom);console.log(APP.modules.ajax);})();


// 코드 2. 지역 변수 사용
(function(){
    var modules = APP.modules;
    console.log(modules.utils);
    console.log(modules.events);
    console.log(modules.dom);
    console.log(modules.ajax);
})();

// 코드 2. 압축 결과
(function(){var a=APP.modules;console.log(a.utils);console.log(a.events);console.log(a.dom);console.log(a.ajax);})();
```

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 비공개 프로퍼티와 메소드

JAVA와 같은 언어와 달리 Javascript 언어에는 private, protected, public 프로퍼티와 메소드를 정의하는 별도의 문법이 없다. 객체의 모든 멤버는 public, 즉 공개되어 있다.

```js
var obj = {
    'prop': 1,
    'getProp': function() {
        return this.prop;
    }
};

console.log(obj.prop);      // 공개되어 접근 가능
console.log(obj.getProp()); // 역시나 공개되어 접근 가능
```

생성자 함수를 사용해 객체를 생성할 때 역시 모든 멤버가 공개된다.

```js
function Widget() {
    this.name = '위젯';
    this.stretch = function() {
        return '위이이이제트~';
    };
}

var gazet = new Widget();
console.log(gazet.name);      // 공개되어 접근 가능
console.log(gazet.stretch()); // 역시나 공개되어 접근 가능
```

-

#### 비공개(Private) 멤버

Javascript 언어에 비공개 멤버를 정의하기 위한 별도의 문법은 없지만, 클로저를 사용해 이를 구현할 수 있다. 생성자 함수 안에 클로저를 만들면 클로저 유효 범위 안의 변수는 생성자 함수 외부에 노출(비공개)되지 않지만, 공개된 메소드를 통해 참조하여 사용할 수 있다. 즉 생성자에서 객체를 반환할 때 객체의 메소드를 정의하면, 이 메소드 안에서는 비공개 변수에 접근할 수 있는 것이다.

```js
function Widget() {
    // 비공개 멤버
    var name = '위젯';
    // 공개 멤버
    this.getName = function() {
        return name;
    };
}

var mazinga = new Widget();
console.log(mazinga.name);      // 비공개되어 접근 불가능
console.log(mazinga.getName()); // 공개된 메소드를 통해 접근 가능
```

이처럼 Javascript 세상에서 비공개 멤버를 사용하는 것은 손쉬운 일이다. 비공개로 할 데이터를 함수와 같은 독립된 공간으로 감싸기만 하면 된다. 이 데이터는 함수의 지역 변수로 할당되었기에 함수 외부에서는 접근이 불가능하다.

-

#### 특권(Privileged) 멤버

특권 멤버란? 비공개 멤버에 접근 권한을 가진(일종의 특권을 부여받은) 공개된 멤버에 불과하다. 앞서 다룬 예제에서 `getName()`은 비공개 멤버인 `name`에 특별하게 접근이 허가된 권한을 가지고 있으므로 특권 멤버라 할 수 있다.

##### 비공개 멤버의 허점

비공개 멤버를 유지하는 것이 관건이라면, 다음과 같은 경우에 대해서 신경을 써야 한다.

> 특권 멤버에서 비공개 멤버 값을 바로 반환한다고 가정할 때, 비공개 멤버의 유형이 객체 또는 배열이라면 값이 아닌 참조가 반환되기에 외부 코드에서 비공개 멤버 값을 수정할 수 있다.

아래 코드의 경우 얼핏 보면 문제가 없어 보인다.

```js
function Widget() {
    // 비공개 멤버
    var specs = {
        'screen_width': 320,
        'screen_height': 480,
        'color': '#fefefe'
    };
    // 공개 멤버
    this.getSpecs = function() {
        return specs;
    };
}
```

하지만 `getSpecs()` 특권 멤버가 `specs` 비공개 멤버에 대한 참조를 반환한다는 것이 문제다. `specs`는 감춰진 비공개 멤버처럼 보이지만, `Widget` 사용자에 의해 변경될 소지가 충분하다.

```js
var taegoundo = new Widget(),
    specs     = taegoundo.getSpecs();

specs.color = '#ffb03b';
specs.price = 'free';

console.dir(taegoundo.getSpecs()); // 결과가 바뀌었다!
// 바뀐 결과
// {
//     'screen_width': 320,
//     'screen_height': 480,
//     'color': '#ffb03b',
//     'price': 'free'
// }
```

이와 같은 의도치 않은 문제를 해결하려면 비공개로 유지해야 하는 객체, 배열에 대한 참조를 전달할 때 주의를 기울이는 수밖에 없다. `getSpecs()` 사용 시 새로운 객체를 만들어 사용자에게 필요한 데이터 일부만 담아 반환하면 어떨까? 이를 두고 '**최소 권한의 원칙**([Principle of Least Authority, POLA](http://c2.com/cgi/wiki?PrincipleOfLeastAuthority))'라고 한다. **필요 이상의 권한을 주지 말아야 한다는 의미**이다.

예를 들면 `Widget` 사용자가 어떤 상자에 들어 맞을지를 알아보고 싶어하는 거라면 `Widget` 면적만 알려주면 된다. 그렇다면 모든 정보를 내주는 대신 `getDimensions()`와 같은 멤버를 만들어 `width`, `height` 만을 담은 객체를 반환하면 된다. `getSpecs()` 멤버 구현은 애초에 필요없었을지도 모른다.

모든 데이터를 넘겨야 한다면, 객체를 복사하는 헬퍼 함수를 만들어 복사된 객체를 넘겨주는 것도 방법이다. 일반적으로 객체 복사는 얕은 복사(Shallow Copy)와 깊은 복사(Deep Copy)로 나뉜다. 얕은 복사는
객체의 최상위 멤버만 복사하는 것을 말하며, 깊은 복사란 중첩된 모든 멤버를 재귀적으로 복사하는 것을 말한다.

-

#### 객체 리터럴과 비공개 멤버

생성자가 아닌, 객체 리터럴의 경우 비공개 멤버를 어떻게 만들어야 할까? Javascript에서 비공개 멤버를 만드는 방법은 함수로 비공개 데이터를 감싸기만 하면 된다. 따라서 객체 리터털에서는 즉시 실행 함수를 추가하여 클로저를 만든다.

```js
var yamoo9; // 전역 변수 dom에 객체를 할당할 예정.

(funtcion(){
    // 비공개 멤버
    var name = '지훈';

    // 공개될 부분 구현
    // 함수 내부에서 var를 사용하지 않았기에 전역에서 변수를 찾음.
    yamoo9 = {
        // 특권 멤버
        'getName': function() {
            return name;
        }
    };
})();

yamoo9.getName(); // '지훈'
```

다음과 같이 기본 개념은 유사하지만 다르게 구현할 수 있다.

```js
var yamoo9 = (function(){
    // 비공개 멤버
    var name = '지훈';
    // 공개될 부분 구현
    return {
        'getName': function() {
            return name;
        }
    };
}());

yamoo9.getName(); // '지훈'
```

이 방법은 곧 살펴보게 될 **'모듈 패턴'**의 기초가 된다.

-

#### 프로토타입과 비공개 멤버

생성자를 사용하여 비공개 멤버를 만들 경우, 생성자를 호출하여 새로운 객체를 만들 때마다 비공개 멤버가 매번 재 생성된다는 단점이 있다. 사실 생성자 내부에서 this에 멤버를 추가하면 항상 이런 문제가 발생한다. 이러한 중복을 없애고 메모리를 절약하려면 공통 속성(프로퍼티/메소드)을 생성자의 `prototype` 속성이 참조하는 객체에 추가해야 한다.

이렇게 하면 동일한 생성자로 만들어진 모든 객체 인스턴스는 공통된 부분을 공유하게 된다. 감춰진 비공개 멤버들도 모든 인스턴스가 함께 쓸 수 있다. 이를 구현하기 위해서는 앞서 다룬 2가지 패턴, 생성자 함수 내부에 비공개 멤버를 만드는 패턴과 객체 리터럴로 비공개 멤버를 만드는 패턴을 함께 써야 한다. 이유는 `prototype` 속성이 참조하는 것 또한 객체라서 객체 리터럴로 생성할 수 있기 때문이다.

```js
function Widget() {
    // 비공개 멤버
    var name = 'iPod';
    // 공개 멤버
    this.getName = function() {
        return name;
    };
}

Widget.prototype = (function(){
    // 비공개 프로토타입 멤버
    var browser = 'Mobile Webkit';
    // 공개 프로토타입 멤버
    return {
        'getBrowser': function() {
            return browser;
        }
    };
})();

var toy = new Widget();

console.log( toy.getName() );    // 'iPod'
console.log( toy.getBrowser() ); // 'Mobile Webkit'
```

-

#### 비공개 멤버를 공개 멤버로 노출시키는 방법

노출 패턴(Revelation Pattern)은 비공개 멤버를 구현하면서도 동시에 공개 멤버로도 노출하는 것을 말한다. 객체의 모든 기능이 객체가 수행하는 작업에 필수 불가결한 것들이라서 최대한의 보호가 필요한데, 동시에 이 기능들의 유용성 때문에 공개적인 접근도 허용하고 싶은 경우가 있을 수 있다. 노출 패턴은 이러한 경우에 유용하게 쓸 수 있다.

멤버가 공개되어 있다는 것은 결국 이 메서드가 위험에 노출될 수 있다는 말과 같다. 공개 API 사용자가 본의 아니게 멤버를 수정할 수 있기 때문이다. (ECMAScript 5에 추가된 객체 고정(`Object.freeze()`)을 사용하면 사용자가 더 이상 수정하지 못하게 막을 수 있다)

노출 패턴이란 용어는 Christian Heilmann이 만들어 냈으며, 처음에는 '모듈 노출 패턴(Revealing Module Pattern)'이라 불렀다. 노출 패턴을 구현하는 방법을 살펴보면 객체 리터럴 안에서 비공개 멤버를 만드는 패턴에 기반하고 있다.

```js
var my_arr;

(function(){

    var type     = '[object Array]',
        toString = Object.prototype.toString;

    function isArray(data) {
        return toString.call(data) === type;
    }

    function indexOf(arr, target) {
        if ( !isArray(arr) ) { return; }
        arr.forEach(function(item, index) {
            if ( arr[index] === target ) {
                return index;
            }
        });
        return -1;
    }

    my_arr = {
        'isArray': isArray,
        'indexOf': indexOf,
        'inArray': inArray
    };

})();
```

비공개 멤버(변수 2개, 함수 2개)는 즉시 실행 함수 내부에 자리 잡고 있다. 기본적으로 이들은 외부에서 접근이 불가능하다. 하지만 공개해도 되겠다고 판단된 멤버는 즉시 실행 함수의 마지막 부분에서 `my_arr` 객체에 설정된다. 여기에서 비공개 멤버 `indexOf()` 함수는 2개의 속성으로 노출되었다. 하나는 ECMAScript 5에서 사용되는 이름인 `indexOf`로 다른 하나는 PHP에서 사용되는 이름인 `inArray`로 노출한다.

이와 같이 노출 패턴을 사용하면 공개된 멤버인 `indexOf()`에 예기치 못한 일이 발생하더라도, 또 다른 공개 멤버 `inArray()`에 의해 비공개 함수인 `indexOf()`는 안전하게 보호(참조)되기 때문에 작동에 문제가 없다.

```js
var data1 = [9, 99],
    data2 = {};

my_arr.isArray(data1);     // true
my_arr.isArray(data2);     // false
my_arr.indexOf(data1, 99); // 1
// my_arr 객체의 indexOf 공개 멤버 제거(예기치 못한 일 발생!)
delete my_arr.indexOf;
// indexOf 공개 멤버가 제거되었음에도 inArray()를 통해 처리할 수 있다.
my_arr.inArray(data1, 9);  // 0
```

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 모듈 패턴

모듈 패턴은 늘어나느 코드를 구조화하고 정리하는데 큰 도움이 되기에 오늘날 널리 쓰인다. 다른 언어와는 달리 Javascript 세상에는 패키지(Package)를 위한 별도의 문법이 없다. 하지만 모듈 패턴을 사용하면 개별적인 코드를 느슨하게 결합시킬 수 있다. 각 기능들을 블랙박스처럼 다루면서도 스프트웨어 개발 중에 (끊임없이 변화가 요구되는) 요구 사항에 따라 기능을 추가하거나 교체하거나 삭제하는 것도 자유롭게 할 수 있다.

Javascript 모듈 패턴은 다음의 여러 패턴을 조합한 것이다.

- 네임스페이스 패턴(Namespace Pattern)
- 즉시 실행 함수(IIFE)
- 비공개 멤버와 특권 멤버(Private/Public Members)
- 의존 관계 선언(Module Dependencies)

모듈 패턴의 첫 단계는 네임스페이스를 설정하는 것이다. 앞서 다뤘던 `$namespace()` 헬퍼 함수를 통해 유용한 배열 메서드를 제공하는 유틸리티 모듈을 만들어 보자.

```js
$namespace('yamoo9.utils.array');
```

다음 단계는 모듈을 정의하는 것이다. 공개 여부를 제한해야 한다면 즉시 실행 함수를 사용해 비공개 유효범위를 만들면 된다. 즉시 실행 함수는 모듈이 될 객체를 반환한다. 이 객체에는 모듈 사용자에게 제공할 공개 인터페이스가 설정될 것이다.

```js
yamoo9.utils.array = (function(){
    // 비공개 멤버가 존재할 영역
    // ...
    return {
        // 공개될 객체 내용을 구현
        // ...
    };
})();
```

이제 공개 인터페이스에 멤버를 추가해보자.

```js
yamoo9.utils.array = (function(){
    // 비공개 멤버가 존재할 영역
    // ...
    return {
        'isArray': function(data) {
            // ...
        }
        'inArray': function(arr, target) {
            // ...
        }
    };
})();
```

즉시 실행 함수의 비공개 유효범위를 사용하면, 비공개 멤버(프로퍼티, 메소드)를 마음껏 선언할 수 있다. 모듈에 의존 관계가 있다면 즉시 실행 함수 최상단에 정의한다. 변수를 선언한 다음 필요에 따라 모듈을 초기화하는데 필요한 1회성 초기화 코드를 두어도 좋다. 즉시 실행 함수가 반환하는 최종 결과는 모듈의 공개 API를 담은 객체가 된다.

```js
// 모듈 생성
$namespace('yamoo9.utils.array');

// 모듈 정의
yamoo9.utils.array = (function(){

    // 의존 관계
    var utils_obj  = yamoo9.utils.object,
        utils_lang = yamoo9.utils.lang,

    // 비공개 멤버(프로퍼티)
        array_str  = '[object Array]',
        toString   = Object.prototype.toString,

    // 비공개 멤보(메소드)
    // ...

    // 필요할 경우, 초기화 패턴(1회성 초기화 절차)를 실행한다.
    // ...

    // 공개 인터페이스 API
    return {
        'isArray': function(data) {
            return toString.call(data) === array_str;
        },
        'indexOf': function(arr, target) {
            if ( !isArray(arr) ) { return; }
            arr.forEach(function(item, index) {
                if ( item === target ) {
                    return index;
                }
            });
            return -1;
        },
        // 추가적인 멤버는 이 곳에 작성한다.
    };
})();
```

모듈 패턴은 점점 늘어만 가는 코드를 정리할 때, 널리 사용되며 매우 권장하는 방법이다.

-

#### 모듈 노출 패턴

비공개 멤버와 관련된 패턴을 살펴보면서 이미 노출 패턴을 다룬 바 있다. 모듈 패턴도 비슷한 방식으로 노출 패턴을 활용할 수 있다. 즉 모든 멤버를 비공개 상태로 유지하고, 최종적으로 공개 API를 갖출 때 공개할 멤버만 골라서 노출하는 것이다. 앞서 다룬 예제를 다음과 같이 수정할 수 있다.

```js
// 모듈 생성
$namespace('yamoo9.utils.array');

// 모듈 정의
yamoo9.utils.array = (function(){

    // 의존 관계
    var utils_obj  = yamoo9.utils.object,
        utils_lang = yamoo9.utils.lang,

    // 비공개 멤버(프로퍼티)
        array_str  = '[object Array]',
        toString   = Object.prototype.toString,

    // 비공개 멤보(메소드)
        isArray = function(data) {
            return toString.call(data) === array_str;
        },
        indexOf = function(arr, target) {
            if ( !isArray(arr) ) { return; }
            arr.forEach(function(item, index) {
                if ( item === target ) {
                    return index;
                }
            });
            return -1;
        };

    // 필요할 경우, 초기화 패턴(1회성 초기화 절차)를 실행한다.
    // ...

    // 공개 인터페이스 API
    // 노출 패턴 사용
    return {
        'isArray': isArray,
        'inArray': indexOf,
        'indexOf': indexOf
    };
})();
```

-

#### 생성자를 생성하는 모듈

앞서 다룬 예제에서 `yamoo9.utils.array` 모듈 객체를 만들어 냈다. 하지만 생성자 함수를 사용해 객체를 만드는 것이 보다 편리할 때도 있다. 모듈 패턴을 사용하면서도 이렇게 할 수 있다. 모듈을 감싼 즉시 실행 함수가 마지막에 객체가 아니라 함수를 반환하게 하면 된다. 다음 예제는 생성자 함수인 `yamoo9.utils.Array`를 반환한다.

```js
// 모듈 생성
$namespace('yamoo9.utils.Array');

// 모듈 정의
yamoo9.utils.Array = (function(){

    // 의존 관계
    var utils_obj  = yamoo9.utils.object,
        utils_lang = yamoo9.utils.lang,

    // 비공개 멤버(프로퍼티)
        array_str  = '[object Array]',
        toString   = Object.prototype.toString,

    // 비공개 메소드
        isArray = function(data) {
            return toString.call(data) === array_str;
        },
        indexOf = function(arr, target) {
            if ( !isArray(arr) ) { return; }
            arr.forEach(function(item, index) {
                if ( item === target ) {
                    return index;
                }
            });
            return -1;
        };

    // 필요할 경우, 초기화 패턴(1회성 초기화 절차)를 실행한다.
    // ...

    // 공개 인터페이스 API - 생성자 함수
    var Constructor = function(arr) {
        this.elements = this.toArray(arr);
    };

    // 공개 인터페이스 API - 프로토타입 객체
    Constructor.prototype = {
        'constructor': yamoo9.utils.Array,
        'version': '1.0.1',
        'toArray': function(arr) {
            if ( !Array.isArray(arr) ) { return; }
            var _arr = [];
            arr.forEach(function(item, index) {
                _arr[index] = item;
            });
            return _arr;
        }
    };

    // 생성자 함수를 반환
    // 이 함수가 새로운 네임스페이스 객체에 할당된다.
    return Constructor;

})();
```

생성자를 생성하는 모듈 패턴을 사용한 모듈은 다음과 같이 사용한다.

```js
var arr = new yamoo9.utils.Array( ['module', 'pattern'] );
```

-

#### 모듈에 전역 변수 가져오기

이 패턴의 흔한 변형 패턴으로는 모듈을 감싼 즉시 실행 함수에 인자를 전달하는 형태가 있다. 어떠한 값이라도 가능하지만, 보통 전역 변수에 대한 참조 또는 전역 객체를 전달한다. 이렇게 전역 변수를 전달하면 즉시 실행 함수 내에서 지역 변수로 사용할 수 있게 되기 때문에 탐색 작업이 좀 더 빨라진다.

```js
yamoo9.utils.module = (function(exports, yamoo9){
    // 전역 객체에 대한 참조와
    // 전역 애플리케이션 네임스페이스 객체에 대한 참조가 지역 변수화 된다.
    // ...
})(this, this.yamoo9);
```

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 샌드박스 패턴

샌드박스 패턴은 네임스페이스 패턴의 단점을 해결할 수 있다. 네임스페이스 패턴의 단점을 나열하면 다음과 같다.

- 애플리케이션 전역 객체가 단 하나의 전역 변수에 의존한다. 따라서 네임스페이스 패턴으로는 동일한 애플리케이션 또는 라이브러리의 2가지 버전을 한 페이지에서 실행시킬 수 없다. 여러 버전들이 모두 하나같이 동일한 전역 변수 이름을 사용하기 때문이다. (jQuery를 예로 들면 1.x.x 버전과 2.x.x 버전을 동시에 사용할 수 없는 것과 같다)

- yamoo9.utils.array와 같이 점으로 연결된 긴 이름을 써야 하고 런타임에는 탐색 작업을 거쳐야 하기 때문에 상대적으로 속도가 느려진다.

이름에서도 알 수 있듯이 샌드박스 패턴은 어떤 모듈이 다른 모듈과 그 모듈의 샌드박스에 영향을 미치지 않고 동작할 수 있는 환경을 제공한다.

-

##### 샌드박스(Sandbox)란?

> 보호된 영역 내에서 프로그램을 동작시키는 것으로, 외부 요인에 의해 악영향이 미치는 것을 방지하는 보안 모델. ‘아이를 모래밭(샌드 박스)의 밖에서 놀리지 않는다’라고 하는 말이 어원이라고 알려져 있다. 이 모델에서는 외부로부터 받은 프로그램을 보호된 영역, 즉 ‘상자’ 안에 가두고 나서 동작시킨다. ‘상자’는 다른 파일이나 프로세스로부터는 격리되어 내부에서 외부를 조작하는 것은 금지되고 있다.

> ![Sandbox](images/sandbox.jpg)

-

#### 전역 생성자

네임스페이스 패턴에서는 전역 객체가 하나다. 샌드박스 패턴의 유일한 전역은 생성자다. 이것을 Sandbox()라고 하자. 이 생성자를 통해 객체들을 생성할 것이다. 그리고 이 생성자에 콜백 함수를 전달해 해당 코드를 샌드박스 내부 환경으로 격리시킬 것이다. 샌드박스 사용법은 다음과 같다.

```js
new Sandbox(function(box){
    // 격리된 샌드박스 환경
    // 이 곳에 코드를 작성한다.
});
```

샌드박스 패턴에 사용된 콜백 함수 내부의 box 객체는 네임스페이스 패턴에서의 yamoo9 객체와 동일한 것이다. 코드가 동작하는데 필요한 라이브러리 기능들이 여기에 들어간다. 이 패턴에 2가지를 추가해보자.

- new를 강제화하는 패턴을 활용하여 객체를 생성할 때 new를 사용하지 않도록 한다.
- Sandbox() 생성자가 선택적인 인자를 하나 이상 받을 수 있게 한다. 이 인자들은 객체를 생성하는데 필요한 모듈 이름을 지정한다. 우리는 코드의 모듈화를 지향하고 있으므로 Snadbox()가 제공하는 기능 대부분이 실제로는 모듈 안에 담겨지게 될 것이다.

이제 객체를 초기화하는 샌드박스 코드가 어떤 모습인지 다뤄보자. 다음과 같이 new를 사용하지 않고도, 가상의 모듈 'ajax'와 'events'를 사용하는 객체를 만들 수 있다.

```js
Sandbox(['ajax', 'events'], function(box) {
    console.log(box);
});
```

앞선 예제와 비슷하지만 모듈 이름을 배열이 아닌, 개별적인 문자열 인자로도 전달할 수 있게 만들 수 있다.

```js
Sandbox('ajax', 'events', function(box) {
    console.log(box);
});
```

사용해야 할 모듈의 개수가 많다면 **'모든 모듈을 사용한다'**는 의미의 와일드카드 `*` 인자를 사용하는 것도 좋을 것이다. 또한 편의를 위해 모듈 이름을 기입하지 않을 경우, 샌드박스가 자동으로 `*` 를 가정하도록 만들어 보자. 구현한다면 다음과 같이 사용할 수 있을 것이다.

```js
Sandbox('*', function(box){
    // * 와일드 카드 사용으로 모든 모듈을 사용한다.
});

Sandbox(function(box){
    // 전달된 모듈 키워드 문자열이 없으므로
    // * 와일드 카드 사용과 동일하게 모든 모듈을 사용한다.
});
```

마지막으로 샌드박스 객체의 인스턴스를 여러 개 만드는 예제를 살펴보자. 심지어 한 인스턴스 내부에 다른 인스턴스를 중첩시킬 수도 있다. 이 때도 각각의 인스턴스 간의 간섭(충돌)은 발생하지 않는다.

```js
Sandbox(['dom', 'events'], function(box) {
    // box 객체는 dom, events 모듈이 결합되어 있다.

    Sandbox('ajax', function(box) {
        // box 객체는 ajax 모듈만 결합되어 있다.
        // 이 box 객체는 바깥 쪽 box 객체와 다르다.
    });

});
```

예제에서 볼 수 있듯이 샌드박스 패턴을 사용하면 콜백 함수로 코드를 감싸기 때문에 전역 네임스페이스를 보호할 수 있다. 필요하다면 함수가 곧 객체라는 사실을 활용하여 Sandbox() 생성자의 스태틱 멤버에 데이터를 저장할 수도 있다. 또 원하는 유형 별로 모듈의 인스턴스를 여러 개 만들 수도 있다. 이 인스턴스들은 각각 독립적으로 동작하게 된다. 그럼 이제 이 모든 기능을 지원하는 Sandbox() 생성자와 그 모듈을 구현하는 방법을 살펴보자.

-

#### 모듈 추가하기

실제 생성자를 구현하기 전에 모듈을 어떻게 추가할 수 있는지부터 살펴보자. Sandbox() 생성자 함수 역시 객체이기에 modules라는 속성을 추가할 수있다. 이 속성은 키(Key)-값(Value) 싸을 담을 객체로 모듈의 이름이 키(Key)가 되고 각 모듈을 구현한 함수가 값(Value)이 될 것이다.

```js
// Sandbox 모듈 객체
Sandbox.modules = {};

// Sandbox 모듈 dom 정의
Sandbox.modules.dom = function(box) {
    box.query    = function(selector, context) {};
    box.queryAll = function(selector, context) {};
    box.css      = function(el, prop, value) {};
}

// Sandbox 모듈 events 정의
Sandbox.modules.events = function(box) {
    // 필요에 따라 Sandbox 프로토타입 객체에 접근 가능
    // box.constructor.prototype.prop = 'value';
    box.on  = function(el, type, handler, capture) {};
    box.off = function(el, type, handler, capture) {};
}

// Sandbox 모듈 ajax 정의
Sandbox.modules.ajax = function(box) {
    box.makeRequest = function() {};
    box.getResponse = function() {};
}
```

위 예제에서는 dom, events, ajax라는 모듈을 추가했다. 모든 라이브러리와 복잡한 웹 애플리케이션에서 흔하게 볼 수 있는 기능들이다. 각 모듈을 구현하는 함수들이 현재의 인스턴스 box를 인자로 받아들인 다음 이 인스턴스에 속성을 추가하게 된다.

-

#### Sandbox 생성자 구현

Sandbox() 생성자를 구현해보자. Sandbox 이름 대신 라이브러리나 애플리케이션에 맞게 적절한 이름을 사용하는 것도 좋을 것이다.

```js
function Sandbox() {
    // arguments를 배열로 변경한다.
    var args = Array.prototype.slice.call(arguments),
    // 마지막 인자는 항상 콜백 함수이다.
    callback = args.pop(),
    // 모듈 이름은 배열 또는 문자열로 전달될 수 있다.
    modules = args[0] && typeof args[0] === 'string' ? args : args[0];

    // new를 강제화하는 패턴
    if ( !(this instanceof Sandbox) ) {
        return new Sandbox(modules, callback);
    }

    // 생성된 인스턴스 객체(this)에 속성을 추가 한다.
    this.prop1 = 'property 1';
    this.prop2 = 'property 2';

    // this 객체에 모듈을 추가한다.
    // 모듈이 없거나, '*' 와일드 카드라면 모든 모듈을 사용한다.
    if (!modules || modules === '*' || modules[0] === '*') {
        modules = [];
        for ( var module in Sandbox.modules) {
            modules.push(module);
        }
    }

    // 필요한 모듈을 초기화 한다.
    modules.forEach(function(module, index) {
        Sandbox.modules[ module ](this);
    });

    // 콜백 함수를 실행한다.
    callback(this);
}

// Sandbox 프로토타입 객체
Sandbox.prototype = {
    'name': 'Application',
    'version': '1.0.2',
    // ...
};
```

이 구현에서 핵심적인 사항을 정리해보자.

- this가 Sandbox 인스턴스인지 확인 후, 생성자 함수로 호출한다. (new를 강제화하는 패턴)
- 생성자 내부에서 this에 속성을 추가한다. 생성자의 프로토타입 객체에도 속성을 추가할 수 있다.
- 필요한 모듈은 배열 또는 개별 문자 유형의 인자로 전달할 수 있고, `*` 와일드카드를 사용하거나, 쓸 수 있는 모든 모듈을 사용하겠다는 의미로 인자를 생략할 수도 있다.
- 필요한 모듈을 모두 파악한 다음에는 각 모듈을 초기화한다. 정리하면 각 모듈을 구현한 함수를 호출해서 객체를 생성한다.
- 생성자의 마지막 인자는 콜백 함수이다. 이 콜백 함수는 맨 마지막에 호출되며, 새로 생성된 인스턴스가 인자로 전달된다. 이 콜백 함수가 실제로 사용자의 샌드박스이며 필요한 기능을 모두 갖춘 상태에서 box 객체를 전달받게 된다.

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 스태틱 멤버

스태틱 멤버란? 인스턴스에 따라 달라지지 않는 속성(프로퍼티,메소드)을 말한다. 클래스 기반의 언어에서는 별도의 문법을 통해 스태틱 멈버를 생성하여 클래스 자체의 멤버인 것처럼 사용한다. 예를 들어 MathUtils 클래스에 max()라는 스태틱 메소드가 있다면 MathUtils.max(3, 5)와 같이 사용할 수 있다.

이것은 공개 스태틱 멤버의 예로, 클래스의 인스턴스를 생성하지 않고도 사용할 수 있다. 비공개 스태틱 멤버는 클래스 사용자에게는 보이지 않지만 클래스의 인스턴스들은 모두 함께 사용할 수 있다. 그럼 Javascript에서 공개/비공개 스태틱 멤버를 구현하는 방법을 살펴보자.

-

#### 공개 스태틱 멤버

Javascript에서는 스태틱 멤버를 표기하는 별도의 문법이 존재하지 않지만 생성자에 속성을 추가함으로서 클래스 기반 언어와 동일한게 스태틱 멈버를 사용할 수 있다. 생성자도 다른 함수와 마찬가지로 객체이고 그 자신의 속성을 가질 수 있기에 이런 구현이 가능하다. 메모이제이션 패턴도 함수에 속성을 추가하는 개념에서 착안된 것이다.

다음 예제는 Gem 생성자에 스태틱 멤버인 isShiny()와 인스턴스 멤버인 setPrice()를 정의한 것이다. isShiny()는 특정 Gem객체를 필요로 하지 않기 때문에 스태틱 멤버라 할 수 있다. 모든 Gem이 빛나는지 알아내는데 특정한 하나의 Gem이 필요하지 않은 것과 같다. 반면 개별 Gem들의 가격은 다를 수 있기 때문에 setPrice() 멤버를 쓰려면 객체가 필요하다.

```js
// 생성자
var Gem = function() {};

// 스태틱 멤버
Gem.isShiny = function() {
    return '반짝! 반짝! 빛나는 보석!';
};

// 프로토타입 객체에 멤버를 추가 (인스턴스 멤버)
Gem.prototype.setPrice = function(price) {
    this.price = price + '원';
};
```

각 멤버를 호출해보자. 스태틱 멤버인 isShiny()는 생성자를 통해 직접 호출되지만, 인스턴스 멤버는 인스턴스 객체를 통해 호출된다.

```js
// 스태틱 멤버를 호출
Gem.isShiny(); // '반짝! 반짝! 빛나는 보석!'

// 인스턴스를 생성한 후, 멤버를 호출
var ruby = new Gem();
ruby.setPrice('1,000,000');
```

인스턴스 멤버를 스태틱 멤버와 같은 방법으로 호출하면 동작하지 않는다. 스태틱 멤버 역시 인스턴스인 ruby 객체를 사용해 호출하면 동작하지 않는다.

```js
typeof Gem.setPrice();          // 'undefined'
typeof Gem.prototype.isShiny(); // 'undefined'
```

스태틱 멤버가 인스턴스를 통해 호출되었을 때도 동작한다면 편리한 경우가 있을 수 있다. 프로토타입에 새로운 멤버를 추가하는 것만으로도 쉽게 구현 가능하다. 이 새로운 멤버는 원래의 스태틱 멤버를 가리키는 일종의 퍼사드(façade) 역할을 한다.

```js
Gem.prototype.isShiny = Gem.isShiny;
ruby.isShiny(); // '반짝! 반짝! 빛나는 보석!'
```

이런 경우에는 스태틱 멤버 안에서 this를 사용할 때 주의를 기울여야 한다. Gem.isShiny()를 호출했을 때 isShiny() 내부의 this는 Gem 생성자를 가르키지만, ruby.isShiny()를 호출했을 때는 this가 ruby 객체를 가리키기 때문이다.

마지막으로 스태틱한 방법으로도 스태틱하지 않은 방법으로도 호출될 수 있는 어떤 멤버를 호출 방식에 따라 살짝 다르게 동작하는 예제를 살펴보자. 멤버가 어떻게 호출되었는지 판별하기 위해 instanceof 연산자를 활용한다.

```js
// 생성자
var Gem = function(price) {
    this.price = price;
};

// 스태틱 멤버
Gem.isShiny = function() {
    // 다음은 항상 동작
    var msg = '반짝! 반짝! 빛나는 보석!';

    // this 참조 값이 인스턴스 객체일 경우만 작동
    if( this instanceof Gem) {
        msg += ', 가격은 ' + this.price + '원!';
    }

    return msg;
};

// 프로토타입 멤버에 스태틱 멤버 할당
Gem.prototype.isShiny = function() {
    return Gem.isShiny.call(this);
};
```

스태틱 멤버, 인스턴스 멤버를 각각 호출하면 다음과 같은 결과가 나온다.

```js
Gem.isShiny(); // '반짝! 반짝! 빛나는 보석!'

var sapphire = new Gem('10,000,000');
sapphaire.isShiny(); // '반짝! 반짝! 빛나는 보석!, 가격은 10,000,000원!'
```

-

#### 비공개 스태틱 멤버

비공개 스태틱 멤버는 다음과 같은 의미를 가진다.

- 동일한 생성자 함수로 생성된 객체들이 공유하는 멤버이다.
- 생성자 외부에서는 접근할 수 없다.

Gem 생성자 안에 counter라는 비공개 스태틱 속성을 구현하는 예제를 살펴보자. 비공개 속성에 대해서는 이미 다룬 바 있다. 같은 방법을 사용할 것이다. 먼저 콜렂 함수를 만들고, 비공개 멤버를 이 함수로 감싼 후, 이 함수를 즉시 실행한 결과로 새로운 함수를 반환한다. 반환되는 함수는 Gem 변수에 할당되어 새로운 생성자가가 될 것이다.

```js
var Gem = (function(){

    // 스태틱 멤버
    var counter = 0;

    // 생성자로 내보낼 함수
    return function() {
        console.log(counter += 1);
    };

}());
```

새로운 Gem 생성자는 비공개 counter 값을 1 증가시켜 콘솔 패널에 기록한다. 몇 개의 인스턴스를 만들어 테스트해보면 실제로 모든 인스턴스가 동일한 counter 값을 공유하고 있음을 확인할 수 있다.

```js
var ruby      = new Gem(), // counter = 1
    sapphaire = new Gem(), // counter = 2
    diamond   = new Gem(); // counter = 3
```

객체 당 1씩 비공개 스태틱 멤버인 counter를 증가시키고 있어 이 스태틱 속성은 Gem 생성자를 통해 생성된 개별 인스턴스 객체의 고유성을 식별할 수 있는 ID가 될 수 있다. 고유한 식별자는 쓸모가 많으니 특권 멤버로 노출시키면 좋지 않을까? 비공개 스태틱 속성에 접근할 수 있는 getGeneratedId() 특권 멤버를 추가해보자.

```js
var Gem = (function(){

    // 비공개 스태틱 멤버
    var couter = 0,

    // 반환될 생성자 함수
    _Gem = function() {
        counter += 1;
    };

    // 특권 멤버
    _Gem.prototype.getGeneratedId = function() {
        return counter;
    };

    return _Gem;

})();
```

이를 테스트해보면 다음과 같은 결과가 출력된다.

```js
var ruby      = new Gem(),
    sapphaire = new Gem(),
    diamond   = new Gem();

ruby.getGeneratedId();      // 1
sapphaire.getGeneratedId(); // 2
diamond.getGeneratedId();   // 3
```

공개/비공개 스태틱 속성은 상당히 편리하다. 특정 인스턴스에 한정되지 않는 멤버와 데이터를 담을 수 있고 인스턴스 별로 매번 다시 생성되지도 않는다.

[`Javascript 객체 생성 패턴 - 상위로 이동 ↑`](#javascript-%EA%B0%9D%EC%B2%B4-%EC%83%9D%EC%84%B1-%ED%8C%A8%ED%84%B4)

-

### 체이닝 패턴

체이닝 패턴이란? 객체에 연쇄적으로 멤버를 호출할 수 있도록 하는 패턴이다. 여러가지 동작을 수행할 때, 먼저 수행한 동작의 반호나 값을 변수에 할당한 후 다음 작업을 할 필요가 없기 때문에 호출을 여러 줄에 걸쳐 쪼개지 않아도 된다.

```js
yamoo9('.gnb').addClass('container').css('box-sizing', 'border-box');
```

만약 멤버에서 의미있는 반환 값이 존재하지 않을 경우 현재 작업 중인 객체 인스턴스인 this를 반환하게 한다. 이렇게 하면 객체의 사용자는 앞서 사용된 멤버에 이어 다음 멤버를 바로 호출할 수 있다.

```js
var counter = {
    'value': 1,
    'increase': function() {
        this.value += 1;
        return this;
    },
    'decrease': function() {
        this.value -= 1;
        return this;
    },
    'add': function(num) {
        this.value += num;
        return this;
    },
    'print': function() {
        return this.value;
    }
};

// 멤버 체이닝 호출
counter
    .increase()
    .add(4)
    .print(); // 6

// 메서드 개별 호출
counter.decrease();
counter.add(4);
counter.print(); // 4
```

-

#### 체이닝 패턴의 장단점

체이닝 패턴을 사용하면 코드량이 줄고 코드가 좀 더 간결해져 거의 하나의 문장처럼 읽히게 할 수 있다는 장점이 있다. 뿐만 아니라 체이닝 패턴을 통해 함수를 쪼개는 방법을 생각하게 되고, 혼자서 너무 많은 일을 처리하려는 함수보다는 좀 더 작고 특화된 함수를 만들게 된다. 장기적으로는 이러한 방법을 통해 유지보수가 개선된다.

그러나 이렇게 작성된 코드는 다소 디버깅하기가 어렵다. 크도의 어느 라인에서 오류가 발생햇는지 알아내더라도, 그 라인에서 수행하는 일이 너무 많을 수 있기 때문이다. 여러 개의 멤버 중 하나가 실패해버리면, 실패한 멤버가 어떤 것인지 알아내기가 쉽지 않다. 『Clean Code』의 저자 로버트 마틴은 이러한 상황을 '열차 사고' 패턴이라고 불렀다.

그럼에도 불구하고 이 패턴은 상당히 유용하다. 어떤 멤버가 명백하게 의미있는 반환 값을 가지고 있지 않다면 항상 this를 반환하게 하는 것이다. 이 패턴은 jQuery 라이브러리에서 흔하게 사용된다. DOM API 또한 체이닝 패턴을 사용하는 경향이 있음을 알 수 있다.

```js
document
    .querySelector('nav')
    .insertAdjacentHTML('afterbegin', '<h2>내비게이션</h2>');
```