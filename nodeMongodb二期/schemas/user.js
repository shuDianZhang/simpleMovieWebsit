/**
 * Created by 白色风车 on 2017/6/30.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;
var UserSchema = new mongoose.Schema({
    username:{
        unique:true,
        type:String
    },
    password:String,
    meta:{
        createAt:{
            type: Date,
            default: Date.now()
        },
        updateAt:{
            type: Date,
            default: Date.now()
        }
    }
});

//每次在存储数据之前，都会来调用这个方法
UserSchema.pre('save',function (next) {
    var user = this;
    // 如果这个数据是新数据的话
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    //加盐
    bcrypt.genSalt(SALT_WORK_FACTOR,function (err,salt) {
        if(err){
            return next(err)
        }
        bcrypt.hash(user.password,salt,function (err,hash) {
            if(err){
                return next(err)
            }
            user.password = hash;
            next();
        });
    });
});

//定义的方法 用于 文档对象进行调用
UserSchema.methods = {
    comparePassword:function (_password,cb) {
        bcrypt.compare(_password,this.password,function (err,isMatch) {
            if(err){
                return cb(err);
            }else{
                cb(null,isMatch);
            }
        })
    }
}

// 定义的方法 用于 集合对象进行调用
UserSchema.statics={
    // fetch:用于取出数据库中所有的数据
    fetch:function (cb) {
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb);
    },
    findById:function (id,cb) {
        return this
            .findOne({_id:id})
            .sort('meta.updateAt')
            .exec(cb);
    }
}

module.exports = UserSchema;