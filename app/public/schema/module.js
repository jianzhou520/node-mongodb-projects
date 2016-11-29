var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var moduleSchema = new Schema ({
    name: String,
    address: String,
    tag: String,
    type: String,
    desc: String,
    level: Number
});

moduleSchema.statics = {
    /**
     * 通过Id查找模块
     * @param id {String} 模块的id
     * @param callback(err, data) {Function} 查询完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    findById: function ( id, callback ) {
        this.find({ _id: id }).exec( callback );
    },
    /**
     * 功过id删除模块
     * @param id {String} 模块id
     * @param callback(err, result) {'Function'} 删除完毕后的回调函数
     */
    deleteById: function ( idArray, callback ) {
        this.remove( { _id: {$in: idArray} }, callback );
    },
    /**
     * 查找系统中所有的模块
     * @param callback(err, data) {Function} 操作成功后的回调
     */
    findAll: function ( callback ) {
        this.find({}).exec( callback );
    }
}
exports.moduleSchema = moduleSchema;