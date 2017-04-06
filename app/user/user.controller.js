(function() {
    'use strict';

    angular
        .module('app')
        .controller('UserController', UserController);

    UserController.$inject = ['UserFactory', 'SweetAlert', 'filepickerService'];

    /* @ngInject */
    function UserController(UserFactory, SweetAlert, filepickerService) {
        var vm = this;

        vm.grabUser = function() {
            UserFactory.getUser()
                .then(
                    function(response) {
                        vm.users = response.data;
                        console.log(response.data);
                    },
                    function(error) {
                        console.log(error);
                    }
                );
        }

        vm.grabUser();

        vm.uploadPhoto = function() {
            filepickerService.pick({
                    mimetype: 'image/*',
                    container: 'modal',
                    services: ['computer', 'facebook']
                },
                function onSuccess(Blob) {
                    console.log(Blob);
                    vm.photoUrl = Blob.url;
                })
        }
    }
})();
