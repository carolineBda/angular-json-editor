var myApp = angular.module('myApp',['angularJsonEditorDirectives']);

myApp.controller('MyCtrl', function($scope) {
    $scope.content = {
                lastName: 'Smith',
                firstName: 'Anne',
                descirption: 'Toulouse is a city in the department of Haute-Garonne in southwestern France. It lies on the banks of the River Garonne, 150 kilometres (93 miles) from the Mediterranean Sea and 230 km (143 mi) from the Atlantic Ocean, and 580 km (360 mi) away from Paris. With 1,202,889 inhabitants as of 1 January 2008,[3] the Toulouse metropolitan area is the fourth-largest in France, after Paris (12.1 million), Lyon (2.1 million), and Marseille (1.7 million).',
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