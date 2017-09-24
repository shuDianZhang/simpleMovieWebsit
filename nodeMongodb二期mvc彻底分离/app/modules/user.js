/**
 * Created by 白色风车 on 2017/6/30.
 */
var mongoose = require('mongoose');
var UserSchema = require('../schemas/user');

//编译生成模型
var User = mongoose.model('User',UserSchema);
module.exports = User