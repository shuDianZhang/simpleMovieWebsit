/**
 * Created by 白色风车 on 2017/7/1.
 */

const Movie = require('../modules/movie');
const User = require('../modules/user');
const _ = require('underscore');

module.exports = function (app) {
    // 预处理 -> use
// 预处理一定要使用next()
    app.use(function (req,res,next) {
        var _user = req.session.user;
        if(_user){
            app.locals.user = _user;
        }
        return next();
    });

//  index page
    app.get('/',function (req,res) {
        console.log(req.session.user);
        Movie.fetch(function (err,movies) {
            if(err){
                console.log('error');
            }
            res.render('index',{
                'title':'imooc 首页',
                movies: movies
            });
        })
    });

//  detail page
    app.get('/movie/:id',function (req,res) {
        // :id可以通过 req.params.id 获取
        var id = req.params.id;
        Movie.findById(id,function (err,movie) {
            res.render('detail',{
                'title':'imooc 电影详情页',
                movie: movie
            });
        });
    });

//  list page
    app.get('/admin/list',function (req,res) {
        Movie.fetch(function (err,movies) {
            if(err){
                console.log(err);
            }
            res.render('list',{
                'title':'imooc 列表页',
                movies: movies
            });
        });
    });

//  admin page
    app.get('/admin/movie',function (req,res) {
        res.render('admin',{
            'title':'imooc 后台录入页',
            movie: {
                title: '',
                doctor: '',
                country: '',
                year: '',
                poster: '',
                flash: '',
                summary: '',
                language: ''
            }
        });
    });

//admin update movie
    app.get('/admin/update/:id',function(req,res){
        var id = req.params.id;
        if(id){
            Movie.findById(id,function (err,movie) {
                res.render('admin',{
                    title:'imooc 后台更新页',
                    movie:movie
                })
            })
        }
    });

//admin post movie
//新增 和 更新 数据
    app.post('/admin/movie/new',function (req,res){
        var id = req.body.movie._id;
        var movieObj = req.body.movie;
        var _movie;
        // 当 前端传过来的电影 数据库中存在
        if(id !== 'undefined'){
            Movie.findById(id,function (err,movie){
                if(err){
                    console.log(err);
                }
                _movie = _.extend(movie,movieObj);
                _movie.save(function (err,movie) {
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/movie/'+movie._id);
                });
            })
        }else{
            // 当 前端传过来的电影 数据库中不存在
            _movie = new Movie({
                doctor: movieObj.doctor,
                title: movieObj.title,
                country: movieObj.country,
                language: movieObj.language,
                year: movieObj.year,
                poster: movieObj.poster,
                summary: movieObj.summary,
                flash: movieObj.flash
            });
            _movie.save(function (err,movie) {
                if(err){
                    console.log(err);
                }
                res.redirect('/movie/'+movie._id);
            });
        }
    });

//删除数据
    app.delete('/admin/list',function (req,res) {
        var id = req.query.id;
        if(id){
            Movie.remove({_id:id},function (err,movie) {
                if(err){
                    console.log(err);
                }else{
                    res.json({success:1})
                }
            });
        }
    });


//用户注册 singup
    app.post('/user/signup',function (req,res) {
        // express内部拿body数据  req.param();
        var _user = req.body.user;
        User.findOne({username:_user.username},function (err,user) {
            if(err){
                console.log(err);
            }
            //如果 user 已经有了 加上return 表示退出函数
            if(user){
                return res.redirect('/');
            }else{
                var user = new User(_user);
                user.save(function (err,user) {
                    if(err){
                        console.log(err);
                    }
                    res.redirect('/admin/userlist');
                });
            }
        });

    });

//userlist page
    app.get('/admin/userlist',function (req,res) {
        User.fetch(function (err,users) {
            if(err){
                console.log(err);
            }
            res.render('userlist',{
                title:'imooc 用户列表页',
                users:users
            });
        });
    });


//用户登录 signin
    app.post('/user/signin',function (req,res) {
        var _user = req.body.user;
        var username = _user.username;
        var password = _user.password;
        User.findOne({username:username},function (err,user) {
            if(err){
                console.log(err);
            }
            //如果用户不存在
            if(!user){
                return res.redirect('/');
            }
            user.comparePassword(password,function (err,isMatch) {
                if(err){
                    console.log(err);
                }
                if(isMatch){
                    req.session.user = user;
                    return res.redirect('/');
                }else{
                    console.log('Password is not match');
                }
            });
        });
    });

//logout 登出
    app.get('/logout',function (req,res) {
        //delete 相当于内存释放 req.session.user = null
        delete req.session.user;
        delete app.locals.user;
        res.redirect('/');
    });
}
