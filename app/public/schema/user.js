var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;
var userSchema = new Schema ({
    name: String,
    userId: {
        type: String,
        unique: true
    },
    password: String
});

userSchema.statics = {
    /**
     * 通过Id查找用户
     * @param id {String} 用户的id
     * @param callback(err, data) {Function} 查询完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    findByUserId: function ( id, callback ) {
        this.find({ userId: id }).exec( callback );
    },
    /**
     * 功过id删除用户
     * @param id {String} 用户id
     * @param callback(err, result) {'Function'} 删除完毕后的回调函数
     * @author zoukai 2016/5/12
     */
    deleteById: function ( idArray, callback ) {
        this.remove( { _id: {$in: idArray} }, callback );
    },
    /**
     * 查找系统中所有的用户
     * @param callback(err, data) {Function} 操作成功后的回调
     * @author zoukai 2016/5/12
     * @author zoukai 2016/5/12
     */
    findAll: function ( callback ) {
        this.find().exec( callback );
    }
}
exports.userSchema = userSchema;