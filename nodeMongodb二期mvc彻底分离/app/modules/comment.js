/**
 * Created by 白色风车 on 2017/7/3.
 */
var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment');

//编译生成模型
var Comment = mongoose.model('Comment',CommentSchema);
module.exports = Comment;