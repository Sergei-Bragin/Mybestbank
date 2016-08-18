angular
    .module('loginForm')
    .component('loginForm', {
        templateUrl: 'component/login-form/login-form.template.html'
    });

angular.module('loginForm')
    .controller('UserCtrl', ['$location', '$scope', 'AuthenticationService', '$localStorage',
        function ($location, $scope, AuthenticationService, $localStorage) {

            $scope.error = null;

            initController();

            function initController() {
                AuthenticationService.Logout();
            }

            $scope.login = function () {
                AuthenticationService
                    .Login(
                        $scope.email,
                        $scope.password,
                        function (result) {
                            if (result === true) {
                                $location.path('/home');
                            } else {
                                $scope.error = 'Username or password is incorrect';
                            }
                        });
            };

            $scope.inLogin = function () {
                return $localStorage.currentUser != null;
            };

        }
    ]);


