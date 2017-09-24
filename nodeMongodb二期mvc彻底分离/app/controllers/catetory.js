/**
 * Created by 白色风车 on 2017/7/4.
 */
var Catetory = require('../modules/catetory');

exports.New = function (req,res){
    res.render('catetory_admin',{
        title:'imooc 后台分类录入页',
        catetory:{}
    });
};

exports.Save = function (req,res) {
    var _catetory = req.body.catetory;
    var catetory = new Catetory(_catetory);

    catetory.save(function (err,catetory) {
        if(err){
            console.log(err);
        }
        console.log(_catetory);
        res.redirect('/admin/catetory/list');
    })
}

exports.List = function (req,res) {
    Catetory.fetch(function (err,catetories) {
        if(err){
            console.log(err);
        }
        res.render('catetorylist',{
            title:'imooc 分类列表页',
            catetories:catetories
        });
    });
}