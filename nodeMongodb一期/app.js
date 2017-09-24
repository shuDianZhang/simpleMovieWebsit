/**
 * Created by 白色风车 on 2017/6/26.
 */
const express = require('express');
const mongoose = require('mongoose');
const _ = require('underscore');
// express-static 可以设置所有类似 href src 等的 根目录
const expressStatic = require('express-static');
const Movie = require('./modules/movie');
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/imooc');
app.locals.moment = require('moment');
app.set('views','./views/pages');  //设置视图根目录
app.set('view engine','jade');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(expressStatic('./public'));
app.listen(port);

console.log('server is running!!!');


//  index page
app.get('/',function (req,res) {
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