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
                    callback(true)
            })
            .error(function (response) {
                var arr = response.errors,
                    message = null;
                for(var i = 0 ; i < arr.length ; i++){
                    if(arr[i].field == 'email'){
                        message = arr[i].defaultMessage;
                    }
                }
                console.log(message);
                callback(message)
            })
    }
}