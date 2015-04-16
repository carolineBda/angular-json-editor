'use strict';

module.exports = function(config) {
    config.set({

        basePath: '../',

        files: [
    
            'bower_components/angular/angular.min.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'test/lib/*.js',

            'src/angular-json-editor.js',
            'test/angular-json-editor.spec.js'
        ],
    
        autoWatch: true,
        singleRun: true,
        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine'
        ],
        browsers: ['Chrome'],
    
        reporters: ['dots'],
    
        frameworks: ['jasmine'],
        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};
