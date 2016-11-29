var databaseDao = require('./databaseDao.js');

/**
 * 获得当前页数据，并将页面所需数据返还到页面
 */
exports.renderManage = function ( res, reqType, type, modulesData ) {
    var getDataPromise = databaseDao.findAllData( type );
    getDataPromise.then( function onFulfilled( tableData ) {
        console.log( 'databaseDao ' + tableData );
        res.render( 'manage', {
            viewport: '',
            moduleData: modulesData,
            tableData: tableData,
            reqType: reqType.substr( 1, reqType.length ),
            includeFile: reqType.substr( 1, reqType.length ) + '.jade'
        });
    });
};
