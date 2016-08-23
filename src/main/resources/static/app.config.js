angular
    .module('bankApp')
    .config(config)
    .run(run);

function config($stateProvider, $urlRouterProvider){

    $stateProvider
        .state('taken',{
            url: "/taken",
            template: '<h1>HI TAKEN</h1>'
        })
        .state('digitalArchief',{
            url: "/digitalArchief",
            template: '<h1>HI digitalArchief</h1>'
        })
        .state('opslag',{
            url: "/opslag",
            template: '<h1>HI opslag</h1>'
        })
        .state('login',{
            url: "/login",
            template: '<login-form></login-form>'
        })
        .state('registration',{
            url: "/registration",
            template: '<registration-form></registration-form>'
        })
        .state('home',{
            url: "/home",
            template: '<home></home>'
        });

    $urlRouterProvider.otherwise("/taken");
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
