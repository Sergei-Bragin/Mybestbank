angular
    .module('header')
    .component('header', {
        templateUrl: 'component/header/header.template.html',
        controller: [
            '$localStorage',
            headerController],
        controllerAs: 'headerCtrl'
    });

function headerController($localStorage){
    var self = this;

    self.companyName = "Youston";
    self.userName = "Admin";
    self.userRole = "admin";
}