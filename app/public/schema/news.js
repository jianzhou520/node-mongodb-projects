var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var newsSchema = new Schema ({
    title: String,
    content: String,
    desc: String,
    liked: Number,
    watched: Number,
    previewImg: String,
    time: String,
    keywords: String
});

newsSchema.statics = {
    /**
     * 通过Id查新闻动态
     * @param id {String}新闻动态的id
     * @param callback(err, data) {Function} 查询完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    findById: function ( id, callback ) {
        this.find({ _id: id }).exec( callback );
    },
    /**
     * 功过id删新闻动态
     * @param id {String}新闻动态id
     * @param callback(err, result) {'Function'} 删除完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    deleteById: function ( idArray, callback ) {
        this.remove( { _id: {$in: idArray} }, callback );
    },
    /**
     * 查找系统中所有新闻动态
     * @param callback(err, data) {Function} 操作成功后的回调
     * @author zoukai 2016/5/12
     * @author zoukai 2016/5/12
     */
    findAll: function ( callback ) {
        this.find({}).exec( callback );
    }
}
exports.newsSchema = newsSchema;