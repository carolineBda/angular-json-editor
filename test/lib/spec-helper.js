Namespace.use('jasmine.grammar.GWT.*');

var mockModule = function(name, value) {

        module(function($provide) {
            $provide.value(name, value);
        });
    },
    compileDirective = function(el) {

        var compiledEl;

        inject(function($rootScope, $compile) {

            compiledEl = $compile(angular.element(el))($rootScope);

            $rootScope.$digest();
        });

        return compiledEl;
    };