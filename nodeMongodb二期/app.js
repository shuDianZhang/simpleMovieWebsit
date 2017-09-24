/**
 * Created by 白色风车 on 2017/6/26.
 */
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
// express-static 可以设置所有类似 href src 等的 根目录
const expressStatic = require('express-static');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/imooc');
app.locals.moment = require('moment');
app.set('views','./views/pages');  //设置视图根目录
app.set('view engine','jade');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(expressStatic('./public'));
app.use(cookieParser());
app.use(session({
    secret:'imooc',
    resave:false,
    saveUninitialized:true,
    store:new mongoStore({
        url:'mongodb://127.0.0.1:27017/imooc',
        collection:'sessions'
    })
}));
require('./config/routes')(app);
app.listen(port);

console.log('server is running!!!');