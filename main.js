const fs = require("fs")
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');

//ejs 사용
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:false}));
app.use('/static', express.static('public'));


app.get('/auth/login', (request, response) => {
    fs.readFile('index.html', 'utf8', (error, html) => {
        response.send(html);
    });
});

// 세션모듈의 설정
app.use(session({
    secret: 'a98yhfi&o2u3bn0(rfuw-gvjoiah3@0945u23r#',
    resave: false,
    saveUninitialized: true
}));

var index = require('./routes/index.js');
app.use('/', index);
// 사용자 페이지, 세션값 유무에 따라서 다른 메세지를 표시
/*app.get('/', function(req, res){
    if(req.session.displayName){
        res.send(`
            <h2>Hello, ${req.session.displayName} </h2>
            <a href="/auth/logout">logout</a>
        `);
    } else {
        res.send(`
            <h2>Please login..</h2>
            <a href="/auth/login">login</a>
        `);
    }
});

*/
// 로그아웃 처리 - 세션 삭제 후 리다이렉트
app.get('/auth/logout', function(req, res) {
    delete req.session.displayName;
    res.redirect('/');
});

// 로그인 처리 - 아이디와 패스워드 비교해서 일치하면 세션에 값을 부여하고 리다이렉트
app.post('/auth/login', (req, res) => {
    var user = {
        username:'10406',
        password:'qkrwnstkd',
        displayName:'10406 박준상'
    };

    var uname = req.body.id;
    var pwd = req.body.password;

    //데이터 베이스
    if(uname === user.username && pwd === user.password) {
        req.session.displayName = user.displayName;
        res.redirect('/');
    } else {
        res.send('Who are you? <a href="/auth/login">login</a>');
    }
    res.send(uname);
});

app.listen(80);
