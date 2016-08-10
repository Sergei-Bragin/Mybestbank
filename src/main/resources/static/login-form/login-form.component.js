angular
    .module('loginForm')
    .component('loginForm', {
        templateUrl: 'login-form/login-form.template.html',
        controller:['$routeParams', 'userService', '$scope',
            function loginFormController(userService, $scope) {

               /* $scope.token = null;
                $scope.error = null;

                $scope.login = function () {
                    $scope.error = null;
                    userService.login($scope.userEmail).then(function (token) {
                            $scope.token = token;
                            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                        },
                        function (error) {
                            $scope.error = error;
                            $scope.userEmail = ''
                        }
                    )
                }

                $scope.logout = function () {
                    $scope.userEmail = '';
                    $scope.token = null;
                    $http.defaults.headers.common.Authorization = '';
                }

                $scope.loggedIn = function() {
                    return $scope.token !== null;
                }

           */
        }]
    });
angular.module('loginForm').controller('UserCtrl', ['userService','$scope','$http',
    function(mainService, $scope, $http) {

        $scope.token = null;
        $scope.error = null;

        $scope.login = function() {
            $scope.error = null;
            mainService.login($scope.userEmail).then(function(token) {
                    $scope.token = token;
                    $http.defaults.headers.common.Authorization = 'Bearer ' + token;
                },
                function(error){
                    $scope.error = error;
                    $scope.userEmail = '';
                });
        };

        $scope.logout = function() {
            $scope.userEmail = '';
            $scope.token = null;
            $http.defaults.headers.common.Authorization = '';
        };

        $scope.loggedIn = function() {
            return $scope.token !== null;
        }
    }
]);
/*
 function axaxaFunction() {
 this.hiMan = "HI man!";
 }*/
