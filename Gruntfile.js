module.exports = function (grunt) {
    grunt.initConfig({
        karma: {
            unit: {
                configFile: 'test/karma.conf.js'
            }
        },
        uglify: {
            'angular-json-editor': {
                src: ['directives/angular-json-editor.js'],
                dest: 'directives/angular-json-editor.min.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('test', ['karma:unit']);

};