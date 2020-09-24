var express = require('express');
var router = express.Router();
module.exports = router;

router.get('/login', (request, response) => {
    response.render('auth/login', {title: 'Login', worngSign: ''});
});

router.post('/login', (request, response) => {
    var user = {
        username:'10406',
        password:'qkrwnstkd',
        displayName:'10406 박준상'
    };

    var uname = request.body.id;
    var pwd = request.body.password;

    //데이터 베이스
    if(uname === user.username && pwd === user.password) {
        request.session.displayName = user.displayName;
        response.redirect('/');
    } else {
        response.render('auth/login', {title: 'Login', worngSign: '잘못된 로그인.'});
    }
});