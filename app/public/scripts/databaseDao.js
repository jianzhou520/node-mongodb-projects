var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// 表示连接状态，disconnect表示未连接，connected表示连接成功
var status = 'disconnect';

// 实例化model
var Role =  mongoose.model(
    'roles', 
    require('../schema/roles.js').roleSchema
);
var Module = mongoose.model(
    'modules', 
    require('../schema/module.js').moduleSchema
);
var User = mongoose.model(
    'users', 
    require('../schema/user.js').userSchema
);
var News = mongoose.model(
    'news', 
    require('../schema/news.js').newsSchema
);
var Product = mongoose.model(
    'products', 
    require('../schema/product.js').productSchema
);
var Information = mongoose.model(
    'informations', 
    require('../schema/companyInfo.js').informationSchema
);
var Partner = mongoose.model(
    'partners', 
    require('../schema/partner.js').partnerSchema
);

// 连接数据库
mongoose.connect('mongodb://127.0.0.1:27017/cloud');
var db = mongoose.connection;
db.on('error', function ( err ) {
    status = 'disconnect';
    console.log ( '数据库错误 ' + err );
});
db.once('open', function () {
    console.log( '数据库开启成功' );
});

// 数据库操作
/**
 * 获取系统中所有的模块
 * 
 * @return {Promise} 一个promise对象，包含了运行成功或失败的情况
 *
 */
exports.findAllData = function ( type ) {
    return new Promise( function ( resolve, reject ) {
        if ( type == 'module' ) {
            Module.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'user' ) {
            User.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'role' ) {
            Role.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'news' ) {
            News.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'products' ) {
            Product.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'companyInfo' ) {
            Information.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        } else if ( type == 'partner' ) {
            Partner.findAll( function ( err, data ) {
                if ( err ) {
                    reject ( err );
                } else {
                    resolve ( data );
                }
            });
        }
    });    
};

/**
 * 根据_id和类别来查找实体
 * @param _id {String} 实体的_id
 * @param type {String} 实体的类别
 * @return {Promise}
 * @author zoukai 2016/5/13
 */
exports.findByIdAndType = function ( _id, type ) {
    return new Promise( function ( resolve, reject ) {
        switch ( type ) {
            case 'news':
                News.findById ( _id, function ( err, data ) {
                    if ( err ) {
                        reject ( err );
                    } else {
                        resolve ( data );
                    }
                });
            break;
            case 'user':
                User.findByUserId ( _id, function ( err, data ) {
                    if ( err ) {
                        reject ( err );
                    } else {
                        resolve ( data );
                    }
                });
                break;
            default:
                break;
        }
    });
}

/**
 * 根据类别删除items指定的所有项
 * @param items {String} 由','拼接的所有项id的字符串
 * @return {Promise} 删除操作的promise
 * @author zoukai 2016/5/12
 */
exports.deleteAllByType = function ( items, type ) {  
    var i = 0;
    return new Promise( function ( resolve, reject ) {
        switch ( type ) {
            case 'role': 
                Role.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }   
                });
                break;
            case 'module':
                Module.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'user':
                User.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'news':
                News.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'products':
                Product.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'partner':
                Partner.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'companyInfo':
                Information.deleteById( items, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            default:
                break;
        }
    });
};

/**
 * 添加对应类别的实体
 * @type {String} 要添加的实体的类别
 * @entity 要添加的实体数据
 * @return {Promise} 返回一个Promise对象
 * @author zoukai 2016/5/12
 */
exports.saveByType = function ( type, req ) {
    var entity = req.body,
        bcrypt = require('bcryptjs'), 
        salt = bcrypt.genSaltSync( 10 );  // 密码强度
    return new Promise( function ( resolve, reject ) {
        switch ( type ) {
            case 'user':
                // 加盐算法
                
                User.create({
                        name: entity.userName,
                        userId: entity.userId,
                        password: bcrypt.hashSync(entity.password, salt)
                    },
                    function ( err, result ) {
                        if ( err ) {
                            reject( err );
                        } else {
                            resolve( result );
                        }
                    }
                );
                break;
            case 'news':
                News.create({
                    title: entity.title,
                    desc: entity.newsDesc,
                    content: entity.editorValue,
                    liked: 0,
                    watched: 0,
                    time: new Date().toLocaleString(),
                    previewImg: req.file.path.replace('public', '.'),
                    keywords: entity.keywords,
                }, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve ( result );
                    }
                });
                break;
            case 'product':
                Product.create({
                    img: req.file.path.replace('public', '.'),
                    name: entity.name,
                    desc: entity.desc
                }, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'partner':
                Partner.create({
                    logo: req.file.path.replace('public', '.'),
                    name: entity.name,
                    desc: entity.desc
                }, function ( err, result ) {
                    if ( err ) {
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
            case 'module':
                Module.create({
                    name: entity.name,
                    address: entity.address,
                    type: entity.moduleType,
                    tag: entity.tag,
                    desc:entity.desc ,
                    level: entity.level
                }, function ( err, result ) {
                    if ( err ) {
                        console.log('添加模块错误 ' + err );
                        reject( err );
                    } else {
                        resolve( result );
                    }
                });
                break;
            case 'role':
                var promise = Promise.resolve(),
                    objArr = [];
                promise
                .then( function onFulfilled () {
                    User.findById( req.body.userId, function ( err, data ) {
                        if ( err ) {
                            console.log( '获取用户出错 ' + err );
                        } else {
                            objArr['user'] = data[0];
                            Module.findById( req.body.moduleId, function ( err, data ) {
                                if ( err ) {
                                    console.log ( '获取模块出错 ' + err );
                                } else {
                                    objArr['moduleObj'] = data[0];
                                    Role.create({
                                        'user': objArr.user,
                                        'moduleObj': objArr.moduleObj
                                    }, function ( err, result ) {
                                        if ( err ) {
                                            console.log ('添加模块错误 ' + err );
                                            reject( err );
                                        } else {
                                            console.log ( '添加模块成功 ' + result );
                                            resolve ( result );
                                        }
                                    });
                                }
                            });
                        }
                    });
                });
                
                break;
            default:
                break;
        }
    });
}

/**
 * 更新已阅次数和更新点赞次数
 * @param type {String} 表示更新的类别
 * @param data {Object} 获得的请求的参数实体
 * @return {Object} 根据操作的结果来返回对应的值，如果更新成功，则返回result，
 * 如果更新错误将由Promise对象的catch方法捕获并处理
 */
exports.updateContent = function ( type, data ) {
    switch ( type ) {
        case 'news':
            News.update(
                { _id: data[0]._id },
                { $set: { watched: Number(data[0].watched) + 1 } },
                function ( err, result ) {
                    if ( err ) {
                        console.log ( '更新已阅次数出错 ' + err );
                    } else {
                        return result;
                    }
                }
            );
            break;
        case 'like':
            News.update(
                { _id: data[0]._id },
                { $set: { liked: Number(data[0].liked) + 1 } },
                function ( err, result ) {
                    if ( err ) {
                        console.log ( '更新已阅次数出错 ' + err );
                    } else {
                        return result;
                    }
                }
            );
            break;
        default:
            break;
    }
}

/**
 * 更行对应实体的所有字段
 * @param type {String} 实体类别
 * @param req {Object} 请求的对象
 */
exports.updateAllContent = function ( type, req ) {
    switch ( type ) {
        case 'companyInfo': 
            Information.update(
                { _id: req.body._id },
                { $set: { 
                    name: req.body.name,
                    address: req.body.address,
                    person: req.body.person,
                    tel: req.body.tel,
                    phone: req.body.phone
                 }},
                function ( err, result ) {
                    if ( err ) {
                        console.log ( '更新已阅次数出错 ' + err );
                    } else {
                        return result;
                    }
                }
            );
            break;
    }
}