module.exports = function ( grunt ) {

    // grunt 的初始化参数
    require('time-grunt')(grunt);
    require('grunt-task-loader')(grunt);
    // grunt初始化
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        
        connect: {
            server: {
                options: {
                    protocol: 'http',
                    hostname: '127.0.0.1',
                    port: 8080,
                    open: true,
                    base: ['./']
                },
                livereload: 35729
            }
        },
        
        watch: {
            css: {
                files: [
                    'app/*.html'
                ]
            },
            options: {
                livereload: 35729
            }
        }
    });
    grunt.registerTask( 'server', [
        'connect', 
        'watch'
    ] );
}