angular
    .module('registrationForm')
    .component('registrationForm', {
        templateUrl: 'component/registration-form/registration-form.template.html',
        bindings: {
            name: '<',
            email: '<',
            password: '<',
            rePassword: '<'
        },
        controller: [
            '$location',
            'AuthenticationService',
            'RegistrationService',
            registrationForm],
        controllerAs:'registrationFormCtrl'
    });


function registrationForm($location, AuthenticationService, RegistrationService) {

    var self = this;

    self.error = null;

    initController();

    function initController() {
        AuthenticationService.Logout();
    }

    self.registration = function () {
        if (self.password == self.rePassword) {
            RegistrationService
                .RegistrationUser(
                    self.name,
                    self.email,
                    self.password,
                    function (result) {
                        if (result === true) {
                            AuthenticationService.Login(
                                self.email,
                                self.password,
                                function (result) {
                                    $location.path('/home')
                                })
                        } else {
                            self.error = result;
                        }
                    })
        }
    }
}

