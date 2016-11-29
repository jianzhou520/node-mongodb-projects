var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var productSchema = new Schema ({
    img: String,
    name: String,
    desc: String
});

productSchema.statics = {
    /**
     * 通过Id查找产品
     * @param id {String} 产品的id
     * @param callback(err, data) {Function} 查询完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    findById: function ( id, callback ) {
        this.find({ _id: id }).exec( callback );
    },
    /**
     * 功过id删除产品
     * @param id {String} 产品id
     * @param callback(err, result) {'Function'} 删除完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    deleteById: function ( idArray, callback ) {
        this.remove( { _id: {$in: idArray} }, callback );
    },
    /**
     * 查找系统中所有的产品
     * @param callback(err, data) {Function} 操作成功后的回调
     * @author zoukai 2016/5/12
     * @author zoukai 2016/5/12
     */
    findAll: function ( callback ) {
        this.find({}).exec( callback );
    }
}
exports.productSchema = productSchema;