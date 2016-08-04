angular
    .module('loginForm')
    .component('loginForm', {
        templateUrl: 'login-form/login-form.template.html',
        controller: [function loginFormController() {
            this.hiMan = "Hi man!"
        }]
    });

/*
function axaxaFunction() {
    this.hiMan = "HI man!";
}*/
