/*! dom-script.js © yamoo9.net, 2016 */

// DOM Lv0
// 초창기 문서객체 모델

// DOM Lv1
// 표준화 공통 작업 착수
// document.getElementById();       // ElementNode
// document.getElementsByName();    // HTMLCollection -> Nodelist
// document.getElementsByTagName(); // HTMLCollection -> Nodelist

// DOM Lv2
// 신형 이벤트 모델 도입
// .addEventListener()
// .removeEventListener()

// MS 비표준
// .attachEvent()
// .detachEvent()

// DOM Lv3

// DOM Lv4
// .getElementsByClassName()
// .querySelector()
// .querySelectorAll()
// .classList

// <html>
var html = document.documentElement;
    html = document.getElementsByTagName('html')[0];
    html = document.querySelector('html');
// <head>
var head = document.head;
    head = document.getElementsByTagName('head')[0];
    head = document.querySelector('head');
// <body>
var body = document.body;
    body = document.getElementsByTagName('body')[0];
    body = document.querySelector('body');

var my_p = document.getElementsByTagName('p'); // Nodelist, Like Array Object
    my_p = document.querySelector('p');
// console.log(my_p);

// var my_strong = my_p.firstChild;
var my_strong = my_p.firstElementChild;
console.log(my_strong);

dom.addClass(my_strong, 'power');
