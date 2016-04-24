var express = require('express');
var app = express();

app.get('/', function ( req, res) {
    res.send('hello world');    
});

app.get('/test', function ( req, res ) {
    res.send('<div>dskfakdfs</div>');  
});

var server = app.listen(3000, function () {
    var host = server.address().address;  
    var port = server.address().port;  
    console.log( server.address() );
    
    console.log('Example app listening at http://%s:%s', host, port);
});