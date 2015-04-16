'use strict';

var compileDirective = function(el) {

    var compiledEl;

    inject(function($rootScope, $compile) {

        compiledEl = $compile(angular.element(el))($rootScope);

        $rootScope.$digest();
    });

    return compiledEl;
};

var browserTrigger = function(element, eventType) {
    element = element[0];
    if (document.createEvent) {
        var event = document.createEvent('MouseEvents');
        event.initMouseEvent(eventType, true, true, window, 0, 0, 0, 0, 0, false, false,
            false, false, 0, element);
        element.dispatchEvent(event);
    } else {
        element.fireEvent('on' + eventType);
    }
};