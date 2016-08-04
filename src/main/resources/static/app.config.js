angular
    .module('bankApp')
    .config(config);

function config($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/login', {
            template: '<login-form></login-form>'
        })
        .when('/registration', {
            template: '<registration-form></registration-form>'
        })
        .otherwise(
            {redirectTo: '/login'}
        );
}