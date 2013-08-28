'use strict';

angular.module('angularJsonEditorDirectives', [])

    .directive('jsonEditor', function () {
        return {
            restrict: "E",
            replace: true,
            scope: {
                content: '=',
                displayType: '@'
            },
            template: '<ul class="tree"><object-editor ng-repeat="(k, v) in content track by $index" object-type="displayType" key="k" value="content"></object-editor></ul>'
        }
    })

    .directive('objectEditor', ['$compile', function ($compile) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                key: '=',
                value: '=',
                objectType: '='
            },

            template: '<li></li>',

            link: function (scope, element) {

                var renderLabel = function(type) {
                        return (type === 'array') ? '<div class="branch">&nbsp;</div>' : '<span>{{key}}</span>'
                    },

                    content = '',
                    currentValue = scope.value[scope.key];

                if (angular.isArray(currentValue)) {

                    content += renderLabel(scope.objectType) + '<json-editor display-type="array" content="value[key]"></json-editor>';

                } else if (angular.isObject(currentValue)) {

                    content += renderLabel(scope.objectType) + '<json-editor content="value[key]"></json-editor>';

                } else {
                    var size = (currentValue.length > 300) ? 'large' : 'small';
                    content += '<label>{{key}}<input type="text" name="{{key}}" class="' + size + '" ng-model="value[key]" /></label> ';
                }

                element.append(content);
                $compile(element.contents())(scope)
            }
        }
    }]);