/**
 * Created by 白色风车 on 2017/7/2.
 */
const Movie = require('../modules/movie');
const Comment = require('../modules/comment');
const Catetory = require('../modules/catetory');
const _ = require('underscore');
exports.Detail = function (req,res) {
    // :id可以通过 req.params.id 获取
    var id = req.params.id;
    Movie.findById(id,function (err,movie) {
        Comment
            .find({movie:id})
                .populate('from','username')
                .populate('reply.from reply.to','username')
                .exec(function (err,comments) {
                    res.render('detail',{
                        'title':'imooc 电影详情页',
                        movie: movie,
                        comments:comments
                    });
                });
    });
}
exports.List = function (req,res) {
    Movie.fetch(function (err,movies) {
        if(err){
            console.log(err);
        }
        res.render('list',{
            'title':'imooc 列表页',
            movies: movies
        });
    });
}
exports.Save = function (req,res) {
    console.log('这是admin.jade页面的console：');
    console.log(req.body.user);
    Catetory.find({},function (err,catetories) {
        res.render('admin',{
            'title':'imooc 后台录入页',
            movie: {},
            catetories:catetories
        });
    });
};
exports.Update = function(req,res){
    var id = req.params.id;
    if(id){
        Movie.findById(id,function (err,movie) {
            res.render('admin',{
                title:'imooc 后台更新页',
                movie:movie
            })
        })
    }
}
exports.New = function (req,res){
    var id = req.body.movie._id;
    var movieObj = req.body.movie;
    var _movie;
    // 当 前端传过来的电影 数据库中存在
    if(id){
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
        _movie = new Movie(movieObj);
        var catetoryId = _movie.catetory;
        _movie.save(function (err,movie) {
            if(err){
                console.log(err);
            }
            Catetory.findById(catetoryId,function (err,catetory) {
                catetory.movies.push(movie._id);
                catetory.save(function (err,catetory) {
                    res.redirect('/movie/'+movie._id);
                });
            });
        });
    }
}
exports.Del = function (req,res) {
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
}


