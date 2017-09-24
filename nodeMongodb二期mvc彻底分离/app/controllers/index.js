/**
 * Created by 白色风车 on 2017/7/2.
 */
const Movie = require('../modules/movie');
const Catetory = require('../modules/catetory');
exports.Index = function (req,res) {
    console.log('这是index.jade页面的console:');
    console.log(req.session.user);
    Catetory
        .find({})
        .populate({path: 'movies', options: {limit: 5}})
        .exec(function (err, catetories) {
        if (err) {
            console.log(err);
        }
        res.render('index', {
            'title': 'imooc 首页',
            catetories: catetories
        });
    })
}
    // Movie.fetch(function (err,movies) {
    //     if(err){
    //         console.log('error');
    //     }
    //     res.render('index',{
    //         'title':'imooc 首页',
    //         movies: movies
    //     });
    // })
