angular.module('core.user.registration')
    .factory('RegistrationService', Service);

function Service($http, $localStorage) {
    var service = {};

    service.RegistrationUser = RegistrationUser;

    return service;

    function RegistrationUser(userName, userEmail, userPassword, callback) {
        $http.post('/user/new',
            {
                name: userName,
                email: userEmail,
                password: userPassword
            })
            .success(function (response) {
                if (response) {
                    callback(true)
                } else {
                    callback(false)
                }
            })
    }
}