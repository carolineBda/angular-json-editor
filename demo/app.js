var myApp = angular.module('myApp',['angularJsonEditorDirectives']);

myApp.controller('MyCtrl', function($scope) {
    $scope.content = {
                lastName: 'Smith',
                firstName: 'Anne',
                phoneNumbers: [
                    {
                        type: "home",
                        number: "123 456 789"
                    },
                    {
                        type: "fax",
                        number: "987 654 321"
                    }
                ]
    };
});