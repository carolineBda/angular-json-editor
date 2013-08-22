'use strict';

angular.module('angularJsonEditorDirectives', [])

    .directive('jsonEditor', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                json: '='
            },
            template: '<fieldset><ul><object-editor ng-repeat="(k, v) in json" key="k" value="v"></object-editor></ul></fieldset>'
        }
    })

    .directive('objectEditor', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                key: '=',
                value: '='
            },
            template: '<li><label>{{key}}</label></li>',
            link: function ($scope, element) {

                if (angular.isArray($scope.value) || angular.isObject($scope.value)) {

                    element.append("<json-editor json='value'></json-editor>");

                } else {
                    element.append('<textarea ng-model="value"></textarea>');
                }

                $compile(element.contents())($scope)
            }
        }
    });