var express = require('express');
var app = express();
var path = require('path');
var jade = require('jade');
var mobileSupport = 'width=device-width, initial-scale=1, user-scalable=no';
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './public/images/' });
var ueditor = require('ueditor');
var config = require('./public/scripts/config.js');
var entity = require('./public/scripts/entity.js');
var databaseDao = require('./public/scripts/databaseDao.js');
var util = require('./public/scripts/util.js');
var bcrypt = require('bcryptjs');

// 配置请求体的请求解析格式，以便后续通过request对象的body
// 属性取到对应的值

// 配置对json类型的请求体的解析
// 类型为application/json
app.use( bodyParser.json() );

// 配置对表单的post表单请求类别的解析
// 类型为application/x-www-form-urlencode
app.use( bodyParser.urlencoded( {extend: true} ));

// 配置对表单的文件上传请求类别的解析
// 类型为multipart/form-data
// app.use( multer() );

// 配置默认模板引擎
app.set('view engine', 'jade');

// 配置静态文件资源
app.use(express.static('public'));
app.use(express.static('../bower_components'));
app.use(express.static('../node_modules'));
app.use(express.static('./'));

// 页面路由
app.get('/', function ( req, res ) {
    res.render('index.jade', {
        currentPage: 'index',
        viewport: mobileSupport
    });
});

// 首页路由
app.get('/index', function ( req, res ) {
    res.render('index.jade', {
        currentPage: 'index',
        viewport: mobileSupport
    });
});

// 公司简介
app.get('/introduction', function ( req, res ) {
    res.render( 'introduction', {
        currentPage: 'introduction',
        viewport: mobileSupport
    });
});

// 产品路由
app.get('/products', function ( req, res ) {
    databaseDao.findAllData('products')
    .then ( function onFulfilled ( data ) {
        res.render('products', {
            currentPage: 'products',
            viewport: mobileSupport,
            tableData: data
        });
    })
    .catch ( function onRejected ( err ) {
        console.log( '获取产品')
    });
});


// 获取所有库内容
app.get('/getAllData:type', function ( req, res ) {
    var type = req.params.type;
    type = type.substr( 1, type.length );
    var getNewsPromise = 
        databaseDao.findAllData(type);
    getNewsPromise.then ( function onFulfilled ( data ) {
        if ( type == 'news' ) {
                res.render( 'news', {
                currentPage: 'news',
                news: data,
                viewport: mobileSupport
            }); 
        } else {
            res.json( data );
        }
    }).catch ( function onRejected ( err ) {
        console.log ( '获取新闻动态出错 ' + err );
    });
});


// 获取新闻详情
app.get('/getNewsContent:_id', function ( req, res ) {
    var _id = req.params._id;
    _id = _id.substr( 1, _id.length );
    var getNewsContentPromise = 
            databaseDao.findByIdAndType( _id, 'news' );
    getNewsContentPromise.then ( function onFulfilled ( data ) {
        return data;
    }).then ( function onFulfilled ( data ) {
        // 成功获取新闻信息之后，将新闻的已阅加一
        databaseDao.updateContent( 
            'news', 
            data
        );
        return data;
    }).then( function onFulfilled( data ) {
        res.render('newsContent', {
            viewport: mobileSupport,
            news: data
        });
    }).catch ( function onRejected ( err ) {
        console.log ( '获取新闻内容出错 ' + err );
    });
});

// 点赞
app.get( '/like:_id', function ( req, res ) {
    var _id = req.params._id;
    _id = _id.substr(1, _id.length);
    var getDataPromise = 
        databaseDao.findByIdAndType( _id, 'news' );
    getDataPromise.then( function ( data ) {
        databaseDao.updateContent(
            'like',
            data
        );
    }).then( function onFulfilled ( result ) {
        console.log( '点赞成功 ' + result );
        res.send('success');
    }).catch( function onRejected ( err ) {
        console.log( '点赞操作出错 ' + err );
    });
});

// 更新信息
app.post('/update', function ( req, res ) {
    Promise.resolve()
    .then( function onFulfilled ( ) {
        databaseDao.updateAllContent(
            req.body.type,
            req
        );
    }).then( function onFulfilled ( result ) {
        console.log( result );
        res.redirect(req.body.refresh);
    }).catch( function onRejected ( err ) {
        console.log( '更新信息失败 ' + err );
    });
    
});

// 联系我们
app.get('/contact', function ( req, res ) {
    var partners = null,
        getDataPromise = 
            databaseDao.findAllData( 'partner' );
    getDataPromise.then( function onFulfilled ( data ) {
        // 请求合作伙伴成功后再请求公司信息
        var getInfoPromise = 
            databaseDao.findAllData( 'companyInfo' );
        getInfoPromise.then( function onFulfilled ( companyInfo ) {
            res.render( 'contact', {
                currentPage: 'contact',
                partners: data,
                companyInfo: companyInfo,
                viewport: mobileSupport
            });
        }).catch ( function onRejected ( err ) {
            console.log ( '获取公司信息出错 ' + err );
        })
    }).catch( function onRejected ( err ) {
        console.log ( '获取合作伙伴出错 ' + err );
    })
});

// 管理员登录页
app.get('/login', function ( req, res ) {
    res.render('login', {
        viewport: ''
    });
});

// 管理员登录页
app.post('/loginAction', function ( req, res ) {
    console.log( req.body );
    var userId = req.body.userId;
    var password = req.body.password;
    var salt = bcrypt.genSaltSync(10);
    var promise = 
        databaseDao.findByIdAndType(
            userId,
            'user'
        );
    promise.then( function onFulfilled ( data ) {
        console.log( data );
        var user = null;
        if ( data.length == 0 ) {
            res.redirect( '/login?result=nouser' );
        } else {
            user = data[0];
            if ( bcrypt.compareSync( password, user.password) ) {
                res.redirect( '/manage:usersManage' );    
            } else {
                res.redirect( '/login?result=error' );
            }
                        
        }
    }).catch( function onRejected ( err ) {
        console.log( err );
    });
});

// 管理员首页
app.get('/manage?type', function ( req, res ) {
    console.log( req );
    res.render( 'manage', {
        viewport: ''
    });
});

// 获取ueditor的配置请求
app.get(
    '/manage/newsManage',
    function ( req, res ) {
        console.log( 'action ' + req.query.action );
        if(req.query.action === 'config'){
            res.json(config.editorConfig);
        }    
});

// 切换不同的功能面板
app.get(
    '/manage:type',
    function ( req, res, next ) {
        var reqType = req.params.type;
        var getDataPromise = null;
        // 需要从后台动态加载功能菜单
        var promise = databaseDao.findAllData( 'module' );
        promise.then( function onFulfilled ( modulesData ) {
            if( reqType === ':roleManage' ||
                reqType === ':newsManage' ||
                reqType === ':productManage'||
                reqType === ':partnerManage'||
                reqType === ':companyInfo'||
                reqType === ':usersManage' ||
                reqType === ':modulesManage'
                ) {
                switch ( reqType ) {
                    case ':usersManage':
                        console.log( 'here' );
                        util.renderManage( res, reqType, 'user', modulesData );
                        break;
                    case ':roleManage':
                        util.renderManage( res, reqType, 'role', modulesData );
                        break;
                    case ':modulesManage':
                        util.renderManage( res, reqType, 'module', modulesData );
                        break;
                    case ':newsManage':
                        util.renderManage( res, reqType, 'news', modulesData );
                        break;
                    case ':productManage':
                        util.renderManage( res, reqType, 'products', modulesData );
                        break;
                    case ':companyInfo':
                        util.renderManage( res, reqType, 'companyInfo', modulesData );
                        break;
                    case ':partnerManage':
                        util.renderManage( res, reqType, 'partner', modulesData );
                    default:
                        break;
                }
            }
        }).catch( function onRejected ( error ) {
            console.log( error );
        });
    });

// 删除记录的路由
app.post('/manage/deleteAllItems', function ( req, res ) {
    var items = req.body.items.split(',');
    var deletePromise = 
        databaseDao.deleteAllByType(items, req.body.type);
    deletePromise.then( function onFulfilled ( result ) {
        console.log( '删除了' + result.result.n + '条记录' );
        res.send('success');
    }).catch( function onRejected ( err ) {
        console.log( '删除失败' + err );
        res.send('failed');
    });
});

// 新增记录
app.post('/manage/addItem', upload.single('img'), function ( req, res ) {
    console.log( req.body );
    var savePromise = 
        databaseDao.saveByType( 
            req.body.type, 
            req
        );
    savePromise.then( function onFulfilled ( result ) {
        res.redirect(req.body.refresh);
    }).catch( function onRejected ( err ) {
        res.send('failed');
    });
});

// ueditor的post请求
app.post(
    '/manage/newsManage',
    ueditor(path.join(__dirname, 'public'), function ( req, res, next ) {
        console.dir ( req );
        if ( req.query.action == 'uploadimage' ) {
            res.ue_up('./images/');
        }
    })
);

var server = app.listen( 3000, function () {
    var host = server.address().host;
    var port = server.address().port;

    console.log( 'appliction listen on 3000 port ' );
});
