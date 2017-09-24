/**
 * Created by 白色风车 on 2017/7/1.
 */
var index = require('../app/controllers/index');
var user = require('../app/controllers/user');
var movie = require('../app/controllers/movie');
var catetory = require('../app/controllers/catetory');
var comment = require('../app/controllers/comment');
const _ = require('underscore');

module.exports = function (app) {
    // 预处理 -> use
    // 预处理不一定要使用next()
    app.use(function (req,res,next) {
        var _user = req.session.user;
            app.locals.user = _user;
        return next();
    });
//  index
    app.get('/',index.Index);
//  movie
    app.get('/movie/:id',movie.Detail);
    app.get('/admin/list',movie.List);
    app.get('/admin/movie',movie.Save);
    app.get('/admin/update/:id',movie.Update);
    app.post('/admin/movie/new',movie.New);
    app.delete('/admin/list',movie.Del);
//  user
    app.post('/user/signup',user.SignUp);
    app.post('/user/signin',user.SignIn);
    app.get('/signup',user.ShowSignUp);
    app.get('/signin',user.ShowSignIn);
    app.get('/admin/userlist',user.SignInRequire,user.AdminRequire,user.UserList);
    app.get('/logout',user.LogOut);

    //comment
    app.post('/user/comment',user.SignInRequire,comment.save);

    //catetory
    app.get('/admin/catetory/new',user.SignInRequire,user.AdminRequire,catetory.New);
    app.post('/admin/catetory',user.SignInRequire,user.AdminRequire,catetory.Save);
    app.get('/admin/catetory/list',user.SignInRequire,user.AdminRequire,catetory.List);
}

