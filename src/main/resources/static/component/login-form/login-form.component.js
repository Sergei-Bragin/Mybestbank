angular
    .module('loginForm')
    .component('loginForm', {
        templateUrl: 'component/login-form/login-form.template.html',
        bindings:{
            email: '<',
            password: '<'
        },
        controller: [
            '$location',
            'AuthenticationService',
            '$localStorage',
            loginForm],
        controllerAs: 'loginFormCtrl'
    });

function loginForm($location, AuthenticationService, $localStorage){
    var self = this;

    self.error = null;

    initController();

    function initController() {
        AuthenticationService.Logout();
    }

    self.login = function () {
        AuthenticationService
            .Login(
                self.email,
                self.password,
                function (result) {
                    if (result === true) {
                        $location.path('/home');
                    } else {
                        self.error = 'Username or password is incorrect';
                    }
                });
    };

    self.inLogin = function () {
        return $localStorage.currentUser != null
    };
}
