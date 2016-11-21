// JavaScript Core 정리

// 자바스크립트 데이터 유형
// 1. Number
// 2. String
// 3. Boolean
// 4. Function (Object)
// 5. Array (Object)
// 6. Object (Plain Object)

// 원시 데이터 유형
// 1. Number
// 2. String
// 3. Boolean

// 참조 데이터 유형
// 4. Function (Object)
// 5. Array (Object)
// 6. Object (Plain Object)

// 객체 생성
// 생성자 함수
var num, str, boo, fnc, arr, obj;

num = new Number(9);
str = new String('this is string');
boo = new Boolean(true);
fnc = new Function('console.log("this is function object.")');
arr = new Array('3', '4');
obj = new Object();

// 리터럴 (보다 많이 사용, 권장)
// 단!!!! 네이티브(내장, 빌트인) 객체 생성자 함수를 사용할 때만

num = 9;
str = 'this is string';
boo = true;
fnc = function() { console.log('this is function object.') };
arr = ['3', '4'];
obj = {};

// 데이터 타입 체크
// 1. typeof
console.log('typeof num:', typeof num);             // 'number'
console.log('typeof str:', typeof str);             // 'string'
console.log('typeof boo:', typeof boo);             // 'boolean'
console.log('typeof fnc:', typeof fnc);             // 'function'
console.log('typeof arr:', typeof arr);             // 'array' [X]
console.log('typeof obj:', typeof obj);             // 'object'
console.log('typeof null:', typeof null);           // 'object' [X]
console.log('typeof undefined:', typeof undefined); // 'undefined'

// 2. instanceof
// 원시 데이터 유형의 경우 기대대로 체크되지 않음
// 참조 데이터 유형만 올바르게 체크함
console.log('arr instanceof Array:', arr instanceof Array);   // true
console.log('arr instanceof Object:', arr instanceof Object); // false

// 3. .constructor
// 자바스크립트객체.constructor === 생성자
// 객체인 유형에 한해서 만큼은 기대하는대로 올바르게 체크 됨
// ※ 객체가 아닌 유형(undefined, null)에서는 오류가 발생함.
console.log('num.constructor:', num.constructor);
console.log('str.constructor:', str.constructor);
console.log('boo.constructor:', boo.constructor);
console.log('fnc.constructor:', fnc.constructor);
console.log('arr.constructor:', arr.constructor);
console.log('obj.constructor:', obj.constructor);

// 4. custom function `isType()`
function type(data) {
  // 어떤 데이터 유형인지 감지
  return Object.prototype.toString.call(data).slice(8,-1).toLowerCase();
}

function isType(data, compare) {
  return type(data) === compare;
}

function isNumber(data) {
  return type(data) === 'number';
}
function isString(data) {
  return type(data) === 'string';
}
function isBoolean(data) {
  return type(data) === 'boolean';
}
function isFunction(data) {
  return type(data) === 'function';
}
function isArray(data) {
  return type(data) === 'array';
}
function isObject(data) {
  return type(data) === 'object';
}