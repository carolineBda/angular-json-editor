'use strict';

angular.module('angularJsonEditor', [])

    .factory('jsonService', [function () {

        return {
            getValue: function (val) {
                try {
                    return JSON.parse(val);
                } catch (e) {
                    return val;
                }
            }
        };
    }])

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
                    content += '<new-leaf parent="value[key]"></new-leaf>';

                } else if (angular.isObject(currentValue)) {

                    content += renderLabel(scope.objectType) + '<json-editor content="value[key]"></json-editor>';
                    content += '<new-property parent="value[key]"></new-property>';

                } else {
                    var large = currentValue && currentValue.length > 100;

                    if (large) {
                        content += '<label>{{key}}<div class="large editor" ui-ace="{mode: \'html\'}" ng-model="value[key]"></div></label> ';
                      } else {
                        content += '<label>{{key}}<input type="text" name="{{key}}" class="small" ng-model="value[key]" /></label> ';
                    }
                }

                element.append(content);
                $compile(element.contents())(scope);

            }
        }
    }])
    .directive('newLeaf', ['jsonService', function (jsonService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                parent: '='
            },
            template: '<div><input ng-model="propertyValue" type="text" class="small" /><button ng-click="addProperty()" title="Add">+</button></div>',
            link: function(scope) {
                scope.addProperty = function() {
                    scope.parent.push( jsonService.getValue(scope.propertyValue) );
                };

            }
        }
    }])
    .directive('newProperty', ['jsonService', function (jsonService) {
        return {
            restrict: "E",
            replace: true,
            scope: {
                parent: '='
            },
            template: '<div><input ng-model="propertyKey" type="text" class="small" />: <input ng-model="propertyValue" type="text" class="small" /><button ng-click="addProperty()" title="Add">+</button></div>',
            link: function(scope) {
                scope.addProperty = function() {
                    scope.parent[scope.propertyKey] = jsonService.getValue(scope.propertyValue);
                };

            }
        }
    }]);