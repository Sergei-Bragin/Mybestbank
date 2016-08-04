angular
    .module('registrationForm')
    .component('registrationForm', {
        templateUrl: 'registration-form/registration-form.template.html',
        controller: [function loginFormController() {
            this.hiMan = "Hi man!"
        }]
    });
