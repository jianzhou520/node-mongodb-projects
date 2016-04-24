var express = require('express');
var app = express();
var jade = require('jade');
var mobileSupport = 'width=device-width, initial-scale=1, user-scalable=no';
var bodyParser = require('body-parser');
var multer = require('multer');

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
// js
app.use(express.static('scripts'));
// css
app.use(express.static('styles'));
// components
app.use(express.static('../bower_components'));

app.use(express.static('../app'));

app.use(express.static('images'));

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
    res.render('products', {
        currentPage: 'products',
        viewport: mobileSupport
    });
});


// 公司动态
app.get('/news', function ( req, res ) {
    res.render( 'news', {
        currentPage: 'news',
        viewport: mobileSupport
    });
});

// 联系我们
app.get('/contact', function ( req, res ) {
    res.render( 'contact', {
        currentPage: 'contact',
        viewport: mobileSupport
    });
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
    var inputName = req.body.name;
    var inputPassword = req.body.password;
    console.log( inputName + ' ' + inputPassword );
});

// 管理员首页
app.get('/manage', function ( req, res ) {
    res.render( 'manage', {
        viewport: ''
    });
});


var server = app.listen( 3000, function () {
    var host = server.address().host;
    var port = server.address().port;

    console.log( 'appliction listen on 3000 port ' );
});
