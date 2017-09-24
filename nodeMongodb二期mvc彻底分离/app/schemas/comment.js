/**
 * Created by 白色风车 on 2017/7/3.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// ObjectId 是主键 ， 每个schema都会默认配置这个属性
var ObjectId = Schema.Types.ObjectId;
var CommentSchema = new mongoose.Schema({
    // Movie User 是mongoose编译生成的模型
    movie:{type:ObjectId,ref:'Movie'},
    from:{type:ObjectId,ref:'User'},
    reply:[{
        from:{type:ObjectId,ref:'User'},
        to:{type:ObjectId,ref:'User'},
        content:String
    }],
    content:String,
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
CommentSchema.pre('save',function (next) {
    // 如果这个数据是新数据的话
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
});

CommentSchema.statics={
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

module.exports = CommentSchema;