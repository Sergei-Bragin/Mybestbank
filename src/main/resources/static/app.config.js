angular
    .module('bankApp')
    .config(config)
    .run(run);

function config($locationProvider, $routeProvider){
    $locationProvider.hashPrefix('!');
    $routeProvider
        .when('/login', {
            template: '<login-form></login-form>'
        })
        .when('/registration', {
            template: '<registration-form></registration-form>'
        })
        .when('/home',{
            template: '<home></home>'
        })
        .when('/taken',{
            template: '<h1>HI TAKEN</h1>'
        })
        .when('/digitalArchief',{
            template: '<h1>HI digitalArchief</h1>'
        })
        .when('/opslag',{
            template: '<h1>HI opslag</h1>'
        })
        .otherwise(
            {redirectTo: '/taken'}
        );
}

function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login', '/registration', '/taken','/digitalArchief','/opslag'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/taken');
        }
    });
}
