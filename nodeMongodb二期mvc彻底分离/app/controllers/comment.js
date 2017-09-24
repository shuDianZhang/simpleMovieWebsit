/**
 * Created by 白色风车 on 2017/7/3.
 */
const Comment = require('../modules/comment');
exports.save = function (req,res) {
     var _comment = req.body.comment;
     var movieId = _comment.movie;
     if(_comment.cid){
         //回复评论
         Comment.findById(_comment.cid,function (err,comment) {
             var reply = {
                 from:_comment.from,
                 to:_comment.tid,
                 content:_comment.content
             }
             comment.reply.push(reply);
             comment.save(function (err,comment) {
                 if(err){
                     console.log(err);
                 }
                 res.redirect('/movie/'+movieId);
             });
         });
     }else{
         //简单的评论
         var comment = new Comment(_comment);
         comment.save(function (err,movie) {
             if(err){
                 console.log(err);
             }
             res.redirect('/movie/'+movieId);
         });
     }


};