const express = require('express');
const router = express.Router();
// express에서는 express.Router()을 사용해 라우터를 분리할 수 있습니다. 
// express.Router();로 라우터 객체를 생성한다. 

const posts = require('../public/data/diary.json');
// data/diary.json 파일에 diary에 들어갈 post의 id, title, contents가 객체 배열로 담겨있다. 
// require을 해서 파일을 가져오려고 하면 data/diary.json 파일에도 모듈화 하는 코드가 들어있어야 할 것 같은데 찾아볼 수 없다. 
// json 형식의 파일은 특별해서 모듈화 하지 않고도 require로 가져와서 쓸 수 있는가?

// home
router.get('/',(req,res)=>{
    res.render('index', {imgs:[{id: 1}, {id: 2}, {id: 3}]});
});
// ejs의 문법을 알면 이해할 수 있는 내용이다. 
// (질문) res.render에 첫번째 인자인 'index'는 'index.ejs' 파일을 뜻하는가?
// imgs 변수에 배열을 담아서 보내고 있다. 배열에 담겨있는 값은 객체다. 
// '/' url로 요청이 들어왔을 때 index.ejs를 render 하면서 img 변수의 값이 적용된다. 

// profile
router.get('/profile',(req,res)=>{
    res.render('profile.html');
});
// project
router.get('/project',(req,res)=>{
    res.render('project.html');
});
// gallery
router.get('/gallery',(req,res)=>{
    res.render('gallery.html');
});

// diary
router.get('/diary',(req,res)=>{
    res.render('diary',{posts:posts});
});
// posts 변수는 위에 선언되어 있다. diary 게시물 데이터를 json 형태로 저장했다. 
// 따라서 posts.id, post.title, post.content를 사용할 수 있다. 


// diary post
router.get('/diary/:postId',(req,res)=>{
    const postId = req.params.postId
    res.locals.post = posts[postId-1];
    res.render('post');
  });
// post 상세페이지로 이동하는 라우팅이다. 
// 사용자가 상세페이지를 누르면, /diary/:poistId로 이동한다. 
// 사용자가 get 요청을 한다는 게 무슨 의미인가? 사이트에서 '자세히 보기' 버튼을 눌러서 해당 url로 이동하는 게 곧 요청을 한 것이라고 보면 되는가? 
// 사용자가 해당 url로 들어왔다는 것을 서버는 어떻게 get 요청이 온 것이라고 알 수 있는가? 
// var indexRouter = require('./routes/router'); app.use('/', indexRouter);
// 위의 두 줄의 코드가, 사용자가 '/' 주소로 들어오면 나머지는 router.js에 정의 된대로 라우팅 하라는 내용이다. 

//semantic URL의 개념이 적용됐다. 
//diary/:postID라고 지정해두면 url이 '/diary/1' 형식도 라우팅 처리가 가능하다. 
//req.params.postId로 url로 전송된 '1'에 접근할 수 있다
//post가 아니라 res.locals.post라고 사용하는 이유는 무엇인가? 



  //visitor
router.get('/visitor',(req,res)=>{
    res.render('visitor.html')
});


module.exports = router;
// module.exports가 바로 모듈을 만드는 코드입니다. 
// 이 부분이 있어야 다른 파일에서 여기서 export한 것을 require할 수 있습니다. 
