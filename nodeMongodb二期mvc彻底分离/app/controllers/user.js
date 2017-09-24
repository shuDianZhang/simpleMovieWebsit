/**
 * Created by 白色风车 on 2017/7/2.
 */
const User = require('../modules/user');
exports.SignUp = function (req,res) {
    // express内部拿body数据  req.param();
    var _user = req.body.user;
    User.findOne({username:_user.username},function (err,user) {
        if(err){
            console.log(err);
        }
        //如果 user 已经有了 加上return 表示退出函数
        if(user){
            return res.redirect('signin');
        }else{
            var user = new User(_user);
            user.save(function (err,user) {
                if(err){
                    console.log(err);
                }
                res.redirect('/');
            });
        }
    });
}
exports.SignIn = function (req,res) {
    var _user = req.body.user;
    var username = _user.username;
    var password = _user.password;
    User.findOne({username:username},function (err,user) {
        if(err){
            console.log(err);
        }
        //如果用户不存在
        if(!user){
            return res.redirect('/signup');
        }
        user.comparePassword(password,function (err,isMatch) {
            if(err){
                console.log(err);
            }
            if(isMatch){
                req.session.user = user;
                return res.redirect('/');
            }else{
                return res.redirect('/signin');
            }
        });
    });
}
exports.UserList = function (req,res) {
    User.fetch(function (err,users) {
        if(err){
            console.log(err);
        }
        res.render('userlist',{
            title:'imooc 用户列表页',
            users:users
        });
    });
}
exports.LogOut = function (req,res) {
    //delete 相当于内存释放 req.session.user = null
    delete req.session.user;
    //delete app.locals.user;
    res.redirect('/');
}

exports.ShowSignUp = function (req,res) {
    res.render('signup',{
        title:'注册界面'
    });
}
exports.ShowSignIn = function (req,res) {
    res.render('signin',{
        title:'登陆界面'
    });
}
exports.SignInRequire = function (req,res,next) {
    var _user = req.session.user;
    if(!_user){
        return res.redirect('/signin');
    }
    next();
}
exports.AdminRequire = function (req,res,next) {
    var _user = req.session.user;
    if(_user.role < 10 || !_user.role){
        return res.redirect('/signin');
    }
    next();
}