angular.module('core.user.authentication')
    .factory('AuthenticationService', Service);

function Service($http, $localStorage) {
    var service = {};

    service.Login = Login;
    service.Logout = Logout;

    return service;

    function Login(useremail, password, callback) {
        $http.post('/user/login', {email: useremail, password: password})
            .success(function (response) {

                // store username and token in local storage to keep user logged in between page refreshes
                $localStorage.currentUser = {email: useremail, token: response.token};

                // add jwt token to auth header for all requests made by the $http service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                // execute callback with true to indicate successful login
                callback(true);

            })
            .error(function (response) {
                callback(false)
            });
    }

    function Logout() {
        // remove user from local storage and clear http auth header
        delete $localStorage.currentUser;
        $http.defaults.headers.common.Authorization = '';
    }
}