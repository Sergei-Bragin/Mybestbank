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
        .otherwise(
            {redirectTo: '/login'}
        );
}

function run($rootScope, $http, $location, $localStorage) {
    // keep user logged in after page refresh
    if ($localStorage.currentUser) {
        $http.defaults.headers.common.Authorization = 'Bearer ' + $localStorage.currentUser.token;
    }

    // redirect to login page if not logged in and trying to access a restricted page
    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var publicPages = ['/login', '/registration'];
        var restrictedPage = publicPages.indexOf($location.path()) === -1;
        if (restrictedPage && !$localStorage.currentUser) {
            $location.path('/login');
        }
    });
}
