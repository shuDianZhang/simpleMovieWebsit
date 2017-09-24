/**
 * Created by 白色风车 on 2017/6/27.
 */
var mongoose = require('mongoose');
var MovieSchema = require('../schemas/movie');

//编译生成模型
var Movie = mongoose.model('Movie',MovieSchema);
module.exports = Movie
