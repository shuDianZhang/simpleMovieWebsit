/**
 * Created by 白色风车 on 2017/7/4.
 */
var mongoose = require('mongoose');
var CatetorySchema = require('../schemas/catetory');

//编译生成模型
var Catetory = mongoose.model('Catetory',CatetorySchema);
module.exports = Catetory;