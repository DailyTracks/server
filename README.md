# DailyTracks Server

해당 레포는 플랫폼 서버에 대한 레포입니다.

## Instruction to Tech

Node.js, Express, Mysql

## Installation Instructions

1. clone the repository

```powershell
git clone https://github.com/DailyTracks/server
```

2. initial configuration settings in nodejs

```powershell
npm install
```

3. run server.js

```powershell
npm start
```

or

```powershell
nodemon server.js
```

## Protocol

### File Naming Protocol

"기능.폴더(단수로).js"의 형태로 구성

> ### Example
>
> services 폴더에 user를 만든다고 가정하자
> 그럼 파일 이름은 user.service.js

### server와 app의 분리

추후 테스트에 용이하기 위해서 server는 건드리지않고, app에서 앞단 미들웨어에 대한 접근에 설정한다.

### File Structure Protocol

- api
- configs
- constants
- controllers
- services
- models
- helpers

로 구성될 예정이다.
