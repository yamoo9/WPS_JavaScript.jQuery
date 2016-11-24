###### Webpack Module Bundler

![Webpack](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Webpack.png/214px-Webpack.png)

-

### 1. Webpack 설치

`npm` 모듈 `webpack` 전역 설치

```sh
$ npm install --global webpack
```

-

### 2. Webpack CLI

명령어 환경에서 `webpack` 실행 명령어

```sh
# webpack {엔트리(진입) 파일} {번들링(묶음) 파일}
$ webpack entry.js bundle.js
```

`webpack` 결과 압축(Minification)

```sh
# webpack 명령어 옵션: -p, --optimize-minimize
$ webpack entry.js bundle.js -p
```

`webpack` 소스맵(Sourcemap)

```sh
# webpack 명령어 옵션: -d, --debug --devtool sourcemap --output-pathinfo
$ webpack entry.js bundle.js -d
```

`webpack` 관찰(Watch)

```sh
# webpack 명령어 옵션: -w, --watch
$ webpack entry.js bundle.js -w
```

-

### 3. Webpack + CSS 로더

`webpack` CSS 패키징 (의존 모듈 설치)

- [style-loader](https://github.com/webpack/style-loader)
- [css-loader](https://github.com/webpack/css-loader)

> ※ [Webpack Loader List](http://webpack.github.io/docs/list-of-loaders.html)

```sh
# npm install --save style-loader css-loader
$ npm i -D style-loader css-loader
```

`js/entry.js` 에서 CSS 파일 로드(상대 경로)

```js
// 번들링(Bundling, 묶음)을 수행할 CSS 파일 경로 설정
require('!style!css!../css/style.css');
```

> ※ `require()` 구문 안의 문자열이 다소 복잡한 이유는
> 파일을 로드할 로더(loader)를 설정해줘야 하기 때문.

-

### 4. Webpack + Sass

`webpack` Sass 패키징 (의존 모듈 설치)

- [node-sass](https://github.com/sass/node-sass)
- [sass-loader](https://github.com/jtangelder/sass-loader)

```sh
$ npm i -D node-sass sass-loader
```

`js/entry.js` 에서 Sass 파일 로드(상대 경로)

```js
require('!style!css!sass!../sass/style.sass');
```

-

### 4. Webpack [환경설정(Config)](http://webpack.github.io/docs/configuration.html)

`webpack.config.js` 파일 생성

```js
module.exports = {};
```

#### 4-1. webpack 엔트리/아웃풋 파일 경로 설정

- `entry`: 진입 파일 경로 설정
- `output`: 출력 파일 경로 설정
  - `path`: 출력 파일 폴더 설정
  - `filename`: 출력 파일 이름 설정

`webpack.config.js`

```js
module.exports = {
  'entry': './js/entry.js',
  'output': {
    'path': __dirname + '/js',
    'filename': 'bundle.js'
  }
};
```

#### 4-2. webpack 모듈 설정

- `module`: webpack 모듈 설정
  - `loaders`: webpack 로더 설정
    - `test`: 파일 경로를 __정규 표현식__으로 설정
    - `loader`: 번들링에 사용되는 모듈 설정

`webpack.config.js`

```js
module.exports = {
  // webpack 모듈 설정
  'module': {
    // webpack 로더 설정
    'loaders': [
      // Sass 모듈 로더 설정
      {
        'test': /\.(sass|scss)$/,
        'loader': 'style-loader!css-loader!sass-loader' // 'style!css!sass' 가능
      }
    ]
  }

};
```

`js/entry.js` Sass 파일 로드 변경

```js
// Sass 파일 로드
require('../sass/style.sass');
```

__CLI__

```sh
# webpack.config.js 파일을 찾아 설정을 활용
$ webpack
```

#### 4-3. 관찰(Watch)/소스맵 설정

`webpack.config.js`

```js
module.exports = {

  'watch': true,

  'devtool': 'source-map'

};
```

-

### 5. Webpack Dev Server 설치

`npm` 모듈 `webpack-dev-server` 전역 설치

```sh
$ npm i -g webpack-dev-server
```

#### 5-1. Webpack Dev Server 명령어

Webpack Dev Server 명령: 실행

```sh
$ webpack-dev-server
```

Webpack Dev Server 명령: 기본 브라우저로 바로 열림

```sh
$ webpack-dev-server --open
```

Webpack Dev Server 명령: 인라인 실행
> Inline the webpack-dev-server logic into the bundle.

```sh
$ webpack-dev-server --inline
```

-

### 6. 멀티 파일 번들링

`require()` 함수를 사용하여 여러 파일을 번들링 할 수 있지만, entry 파일을 복수(`Array`)로 설정하여 번들링 할 수 있음.

`webpack.config.js`

```js
module.exports = {
  'entry': ['./js/entry.js', './js/another-entry.js']
};
```

-

### 7. Webpack + Babel (ECMAScript 2015)

ECMASCript 2015를 지원하지 않는 클라이언트 환경에서 ES2015를 사용하려면, [Babel](http://babeljs.io) 컴파일러를 사용하여 변환해야 한다. 이를 Webpack에서 사용하려면 다음의 모듈이 필요하다.

- [babel-loader](https://github.com/babel/babel-loader)
- [babel-core](https://github.com/babel/babel/tree/master/packages/babel-core)
- [babel-preset-es2015](https://github.com/babel/babel/tree/master/packages/babel-preset-es2015)

```sh
$ npm i -D babel-core babel-preset-es2015 babel-loader
```

`webpack.config.js`

- `exclude`: 번들링 및 컴파일 제외 디렉토리를 정규 표현식으로 설정
- `cacheDirectory`: 디렉토리 캐시 설정
- `query`: `babel-core` 플러그인 설정
  - `presets`: `babel-preset-es2015` 설정

```js
module.exports = {

  'module': {
    'loaders': [
      {
        'test': /\.js$/,
        'loader': 'babel-loader', // ※ 'babel'도 가능
        'exclude': /node_modules/,
        'query': {
          'cacheDirectory': true,
          'presets': ['es2015']
        }
      }
    ]
  }

};
```

#### 7-1. `*.es6` [파일 확장자 리졸브(Resolve) 설정](https://webpack.github.io/docs/configuration.html#resolve-extensions)

`js` 파일 확장자 대신 `es6` 확장자를 사용하고자 할 경우, 다음과 같이 설정한다.

- `resolve`: 결정 사항 설정
  - `extensions`: 파일 확장자 설정

`webpack.config.js`

```js
module.exports = {

  'resolve': {
    'extensions': ['', '.js', '.es6']
  }

};
```

-

### 8. Webpack + ESLint 프리로더(Pre Loader)

- [eslint](https://github.com/eslint/eslint)
- [eslint-loader](https://github.com/MoOx/eslint-loader)

```sh
$ npm i -D eslint eslint-loader
```


#### [ESLint 규칙](http://eslint.org/docs/rules/)

##### 속성 이름 규칙 설정

- `error` : 규칙 위반을 발견하면 오류 출력 (빨간색)
- `warn`  : 규칙 위반을 발견하면 경고 출력 (노란색)
- `off`   : 아무런 오류/경고 메시지를 출력하지 않음.

`.eslintrc.js` 파일 생성

```js
module.exports = {
  "env": {
    "node": true,    // Node.js에서 실행되는 코드를 정적 검증 설정
    "browser": true, // 웹 브라우저에서 실행되는 코드를 정적 검증 설정
    "es6": true      // ECMAScript 2015(ES6)로 작성된 코드를 정적 검증 설정
  },
  "extends": "eslint:recommended",
  "rules": {
    "no-console": 0,     // console 객체 사용 설정
    "indent": [          // 들여쓰기 설정
      "error",
      2
    ],
    "linebreak-style": [ // 줄바꿈 스타일 설정 [0, "windows"]
      "error",
      "unix"
    ],
    "quotes": [          // 홑 따옴표 사용 설정
      "error",
      "single"
    ],
    "semi": [            // 세미콜론 항상 사용 설정
      "error",
      "always"           // "never"
    ]
  },
  // ES Modules 기능을 활성화하려면, "parserOptions"속성도 설정
  "parserOptions": {
    "sourceType": "module"
  }
};
```

`webpack.config.js`

`preLoaders` 속성은 `loaders` 전에 실행되어야 하는 로더들을 선언하는 부분

```js
module.exports = {

  'module': {
    'preLoaders': [
      {
        'test': /\.es6$/,
        'exclude': /node_modules/,
        'loader': 'eslint-loader'
      }
    ]
  }
};
```

-

### 9. Webpack + TypeScript

```sh
$ npm i -D typescript webpack-typescript
```

[※ TypeScript 설정 옵션](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

`webpack.config.js`

```js
module.exports = {

  'module': {
    'loaders': [
      {
        'test': /\.ts$/,
        'exclude': /node_modules/,
        'loader': 'webpack-typescript?target=ES5' // ES3, ES5, ES6
      }
    ]
  }

  'resolve': {
    'extensions': ['', '.js', '.ts']
  }

};
```

-

### 10. Webpack 빌드

- [strip-loader](https://github.com/yahoo/strip-loader)

```sh
$ npm i -D strip-loader
```

#### 10-1. 빌드 전용 환경설정 파일

`webpack-build.config.js`

```js
/*! webpack-build.config.js © yamoo9.net, 2016 */
'use strict';

// strip-loader 모듈 로드
var WebpackStrip = require('strip-loader');

// webpack.config.js 파일 로드
var dev_config = require('./webpack.config');

// strip_loader 설정
var strip_loader = {
  test: [/\.js$/, /\.es6$/, /\.ts$/],
  exclude: /node_modules/,
  // 제거(strip)할 명령어 설정
  loader: WebpackStrip.loader('console.log', 'console.error')
};

// dev_config 모듈 로더에 strip_loader 설정
dev_config.module.loaders.push(strip_loader);

// dev_config 모듈 출력
module.exports = dev_config;
```

#### 10-2. 빌드 명령

```sh
$ webpack --config webpack-build.config.js -p
```

#### 10-3. ※ 빌드 과정에서 경고(Warning) 메시지 출력 시
> WARNING in bundle.js from UglifyJs

```sh
$ npm i -D webpack
```

`webpack.config.js`

```js
var webpack = require('webpack');

module.exports = {

  // UglifyJsPlugin을 사용하여 컴파일 한 스크립트를 압축할 때
  // 경고를 출력하지 않도록 설정
  'plugins': [
    new webpack.optimize.UglifyJsPlugin({
      'compress': {
        'warnings': false
      }
    })
  ]

};
```

-

### 11. 프로젝트 디렉토리 구조

```sh
.
├── build/
├── js/
├── public/
├── node_modules/
├── package.json
├── webpack-build.config.js
├── webpack.config.js
└── webpack.md
```

`webpack.config.js`

```js
// 경로(Path) 모듈 로드
var path = require('path');

module.exports = {
  // 콘텍스트 경로 설정
  'context': path.resolve('js'),
  'output': {
    // 출력 경로 설정
    'path': path.resolve('build/'),
    'entry': ['./app'],
    // 퍼블릭 경로 설정
    'publicPath': path.resolve('/public/assets/')
    'filename': 'bundle.js'
  },

  // webpack-dev-server 루트 경로 설정
  'devServer': {
    'contentBase': 'public'
  }
};
```

`index.html`

```html
<script src="/public/assets/bundle.js"></script>
```

-

### 12. CSS 번들파일 별도 분리

```sh
$ npm i -D extract-text-webpack-plugin
```

`webpack.config.js`

```js
// extract-text-webpack-plugin 플러그인 모듈 로드
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

  'module': {
    'loaders': [
      {
        test: /\.(sass|scss)/,
        // 로더에 플러그인 적용
        'loader': ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
      }
    ]
  }

  'plugins': [
    // 플러그인 적용파일 설정
    new ExtractTextPlugin('style.css')
  ]

}
```

`index.html`

```html
<link rel="stylesheet" href="/public/assets/style.css">
```

-

### 13. Autoprefixer 모듈

- [autoprefixer](https://github.com/postcss/autoprefixer)
- [autoprefixer-loader](https://github.com/passy/autoprefixer-loader)

```sh
$ npm i -D autoprefixer-loader
```

`webpack.config.js`

```js
module.exports = {

  'module': {
    'loaders': [
      {
        test: /\.(sass|scss)/,
        // autoprefixer-loader 추가
        'loader': ExtractTextPlugin.extract('style-loader', 'css-loader!autoprefixer-loader!sass-loader')
        // autoprefixer-loader 옵션 설정
        // https://github.com/postcss/autoprefixer#browsers
        // https://github.com/ai/browserslist
        // 'css-loader!autoprefixer-loader?{browsers:["last 2 version", "Firefox 15"]}!sass-loader')
      }
    ]
  }

}
```

-

### 14. jQuery 라이브러리 모듈

```sh
$ npm i -D jquery
```

```js
// CommonJS 모듈 로드 방법
// var $ = require('jquery');

// ES2015 모듈 로드 방법
import $ from 'jquery';
```

-

### 15. 페이지 별, 번들 (멀티)

```js
var webpack = require('webpack');

module.exports = {

  entry: {
    'about'   : './about_page.js',   // <--
    'home'    : './home_page.js',    // <--
    'contact' : './contact_page.js'  // <--
  },
  output: {
    path: path.resolve('build/js/'),
    publicPath: '/public/assets/js/',
    filename: "[name].js" // <--
  }

  'plugins': [
    new webpack.optimize.CommonsChunkPlugin('shared.js')  // <--
  ]

};
```

-

### 16. 이미지/폰트 로더

이미지 파일, 폰트 파일을 모두 패키징.

- [url-loader](https://github.com/webpack/url-loader)
- [file-loader](https://github.com/webpack/file-loader)

```sh
$ npm i -D url-loader
```

`webpack.config.js`

```js
module.exports = {

  'module': {
    'loaders': [
      {
        'test': /\.(png|jpg|woff|eot)/,
        'exclude': /node_modules/,
        'loader': 'url-loader?limit=100000'
      }
    ]
  }

}.
```

`entry.js`

```js
require('../images/webpack_logo.png');
```
