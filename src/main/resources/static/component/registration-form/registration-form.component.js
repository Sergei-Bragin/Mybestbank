angular
    .module('registrationForm')
    .component('registrationForm', {
        templateUrl: 'component/registration-form/registration-form.template.html'
    });

angular.module('registrationForm')
    .controller('RegCtrl', ['$scope',
        '$location',
        'AuthenticationService',
        'RegistrationService',
        function ($scope, $location, AuthenticationService, RegistrationService) {

            $scope.error = null;

            initController();

            function initController() {
                AuthenticationService.Logout();
            }

            $scope.registration = function () {
                RegistrationService
                    .RegistrationUser(
                        $scope.name,
                        $scope.email,
                        $scope.password,
                        function (result) {
                            if (result === true) {
                                AuthenticationService.Login(
                                    $scope.email,
                                    $scope.password,
                                    function (result) {
                                        $location.path('/home')
                                    })
                            } else {
                                $scope.error = result;
                            }
                        })
            }

        }
    ]);