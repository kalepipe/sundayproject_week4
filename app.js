const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const partials = require('express-partials');

const livereload = require('livereload');
//파일이 변경되면 자동으로 브라우저를 리로드 한다
const connectLivereload = require('connect-livereload');

const livereloadServer = livereload.createServer();

livereloadServer.watch(['public', path.join(__dirname,'views')]);
//livereloadServer가 감시할 폴더를 지정한다.
//path 모듈을 사용한다. 
//public 폴더와, path.join(__dirname,'views') 폴더를 감시한다. 
//path.join(__dirname, 'views') : 무엇을 의미하는지 질문 
livereloadServer.server.once("connection",()=>{
    setTimeout(()=>{
        livereloadServer.refresh("/");
    },50);
});
// once는 이벤트 발생 시 한 번만 실행하겠다는 것. 이벤트 리스너의 기능이다. 
// "connection"이라는 이벤트가 발생하면, 50밀리세컨드 뒤에 콜백함수가 실행된다. 
// 페이지가 리프래쉬 된다. 


// create router
var indexRouter = require('./routes/router.js');
// indexRouter은 ./routes/router 모듈을 가져온다. 
// 요청에 따라서 router 모듈에 있는 함수가 실행된다. (router.js에 정의되어 있다.)
// router.js 파일에 함수가 어떻게 정의도어 있는지 확인하고 돌아오자. 

// create express server
var app = express();
// express 서버를 만들었다. 

app.use(connectLivereload());

// express server setting with app.set() method
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');
// 템플릿 엔진의 종류와 템플릿 파일의 위치를 정의한다.
// 템플릿 파일의 위치를 path.join(__dirname, 'views') 로 정의 하였는데, 
// __dirname은 현재 파일의 위치 즉, app.js가 위치한 위치를 의미하며, 
// path.join을 이용하면, ${현재디렉토리}/views 라는 경로로 지정한 것이다.
// views : request 요청에 대한 로직을 처리한 후 클라이언트에 응답을 보낼 때 html 코드로 변환해서 반환하는 파일을 정의한 폴더입니다.  
// 여기선 ejs 템플릿을 사용합니다. 

app.engine('html', require('ejs').renderFile);
// 화면 템플릿 엔진을 ejs로 설정한다. 
// 템플릿 엔진이란, 템플릿을 읽어 엔진의 문법과 설정에 따라서 파일을 HTML 형식으로 변환시키는 모듈입니다. 
// app.engine이 하는 역할은 무엇인가? 인자는 무엇인가? 

app.use(express.static('public'));
// 정적파일을 제공하는 폴더를 정의하는 부분이다. 
// 정적인 파일이 위치할 폴더는 'public' 폴더다. 

app.use(partials());
// 설명 요청

app.use('/', indexRouter);
// '/' 주소로 요청이 들어왔을 때 indexRouter가 실행되게 한다. 

app.listen(3000, function(){
  console.log("express server heard on 8000");
  console.log("let's go to http://localhost:8000");
});









