const fs = require("fs")
const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const ejsLocals = require('ejs-locals');

//init setting
app.use(bodyParser.urlencoded({extended:false}));
app.use('/static', express.static('public'));
app.use(session({
    secret: 'a98yhfi&o2u3bn0(rfuw-gvjoiah3@0945u23r#',
    resave: false,
    saveUninitialized: true
}));

//setting ejs
app.engine('ejs', ejsLocals);
app.set('views', './views');
app.set('view engine', 'ejs');

//indexRouter
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

//authRouter
var authRouter = require('./routes/auth/auth');
app.use('/auth', authRouter);

app.listen(80);