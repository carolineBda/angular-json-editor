module.exports = function(config) {
    config.set({

        basePath: '../',

        frameworks: ["jasmine"],

        files: [

            'lib/angular/angular.min.js',
            'test/lib/*.js',

            'directives/angular-json-editor.js',
            'test/angular-json-editor.spec.js'
        ],

        autoWatch: true,
        singleRun: false,

        browsers: ['PhantomJS'],

        reporters: ['dots'],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }
    });
};


