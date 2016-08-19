angular
    .module('home')
    .component('home', {
        templateUrl: 'component/home/home.template.html',
        controller: [
            '$localStorage',
            homeCtrl]
    });

function homeCtrl($localStorage) {
    var self = this;
    self.email = $localStorage.currentUser.email;
}