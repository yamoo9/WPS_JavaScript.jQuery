## NVM(Node Version Manager) 설치

### Windows 설치

[nvm-windows](https://github.com/coreybutler/nvm-windows/releases)

-

### OSX 설치

### 0. homebrew를 통해 Node.js를 사용했다면? 인스톨 한 node.js 모두 삭제

[이슈](https://github.com/creationix/nvm/issues/855#issuecomment-146115434)에서 볼 수 있듯, `v0.31.1`의 `nvm`은 `osx`의 `homebrew`를 지원하지 않음. `brew`를 통해서 `nvm` 및 `node`를 설치하면 충돌이 발생! `nvm`을 사용하시기로 마음 먹었다면, `homebrew`를 사용해서 인스톨 한 `nvm`, `node.js`를 모두 삭제.

```sh
$ sudo brew uninstall node —force sudo brew uninstall nvm —force
```

### 1. nvm 설치

[NVM:GitHub](https://github.com/creationix/nvm)의 지시에 따라서 `nvm`을 설치.

최신 버젼은 아래의 커맨드로 설치.

```sh
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.31.1/install.sh | bash
```

### 2. nvm 실행

`nvm` 자동 실행시키기. 이제부터 실행시키는 모든 `node`의 버젼은 `nvm`이 관리하게 될 것.
하지만 위 작업은 영구적인 것이 아니기 때문에, 터미널이 오픈될 때마다 실행시켜주어야 한다는 불편함이 있음.
따라서 사용 중인 컴퓨터의 `.profile`, `.bashrc` 혹은 `.zshrc`에 다음의 문구를 추가.

```sh
$ source /Users/$USER/.nvm/nvm.sh
```

.bashrc 수정시 권한 문제
```sh
sudo chmod +w /etc/bashrc
sudo vi /etc/bashrc
```
수정 방법 : i 를 누르고 위 `source /Users/$USER/.nvm/nvm.sh` 구문을 마지막 줄에 붙여넣고 esc 누르고 :wq! 입력

터미널이 오픈될 때마다, `nvm`이 골라준 `node`를 실행시킬 수 있음.

#### nvm, 설치 가능한 Node 버전 탐색

```sh
$ nvm ls-remote
```

#### nvm, 새로운 Node 버전 설치

```sh
$ nvm install #{version} #6.6.0
```

#### nvm, 설치된 Node 버전 보기

```sh
$ nvm ls
```

#### nvm, 사용할 Node 버전 설정

```sh
nvm use #{version}
```

### NPM 최신 버전 업데이트

```js
$ npm install -g npm@latest
```
