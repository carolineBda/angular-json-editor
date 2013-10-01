basePath = '../';

files = [
    JASMINE,
    JASMINE_ADAPTER,

    'lib/angular/angular.min.js',
    'test/lib/*.js',

    'src/angular-json-editor.js',
    'test/angular-json-editor.spec.js'
];

autoWatch = true;
singleRun = true;

browsers = ['Chrome'];

reporters = ['dots'];

junitReporter = {
    outputFile: 'test_out/unit.xml',
    suite: 'unit'
};
