/**
 * Created by 白色风车 on 2017/6/27.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.Object;
var MovieSchema = new mongoose.Schema({
    doctor: String,
    title:String,
    language:String,
    country:String,
    summary:String,
    flash:String,
    poster:String,
    year:Number,
    catetory:{type: ObjectId, ref:'Catetory'},
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
MovieSchema.pre('save',function (next) {
    // 如果这个数据是新数据的话
    if(this.isNew){
        this.meta.createAt=this.meta.updateAt=Date.now();
    }else{
        this.meta.updateAt=Date.now();
    }
    next();
});

MovieSchema.statics={
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

module.exports = MovieSchema;